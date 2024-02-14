const { google } = require('googleapis');
const stream = require('stream');
require('dotenv').config();

const { SUCCESS, FAILURE } = require('../constants');

const googleAuthorize = async () => {
  try {
    const scopes = ['https://www.googleapis.com/auth/drive.file'];
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
      null,
      process.env.PRIVATE_KEY,
      scopes
    )
    await jwtClient.authorize();
    
    return { status: SUCCESS, authClient: jwtClient };
  } catch (error) {
    console.log(error);
    return { status: FAILURE, error };
  }
}

const googleDriveUploader = async (fileObject) => {
  try {
    const authClientResult = await googleAuthorize();

    if (authClientResult.status !== SUCCESS) throw new Error(authClientResult.error);

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: 'v3', auth: authClientResult.authClient }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream
      },
      requestBody: {
        name: fileObject.originalname,
        parents: [ process.env.DRIVE_FOLDER_ID ]
      },
      fields: 'id, name'
    });

    return { status: SUCCESS, data };

  } catch (error) {
    console.log(error);
    return { status: FAILURE, error };
  }
}

const googleDriveDeleteFile = async (fileId) => {
  try {
    const authClientResult = await googleAuthorize();

    if (authClientResult.status !== SUCCESS) throw new Error(authClientResult.error);

    await google.drive({ version: 'v3', auth: authClientResult.authClient }).files.delete({
      fileId
    });

    return { status: SUCCESS, message: "Successfully deleted file." };
  } catch (error) {
    return { status: FAILURE, error };
  }
};

const googleDriveGeneratePublicUrl = async (fileId) => {
  try {
    const authClientResult = await googleAuthorize();

    if (authClientResult.status !== SUCCESS) throw new Error(authClientResult.error);

    const drive = google.drive({ version: 'v3', auth: authClientResult.authClient });

    // make file public 
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    const { data } = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink'
    });

    return { status: SUCCESS, data };
  } catch (error) {
    return { status: FAILURE, error };
  }
}

const googleDriveListFiles = async (limit = 10, nextPageToken) => {
  try {
    const authClientResult = await googleAuthorize();

    if (authClientResult.status !== SUCCESS) throw new Error(authClientResult.error);

    const config = {
      pageSize: limit,
      fields: 'nextPageToken, files(id, name)'
    };

    if (!nextPageToken) {
      config.pageToken = nextPageToken;
    }

    const { data } = await google.drive({ version: 'v3', auth: authClientResult.authClient }).files.list(config); 

    return { status: SUCCESS, data };
  } catch (error) {
    return { status: FAILURE, error };
  }
}

module.exports = { googleDriveUploader, googleDriveDeleteFile, googleDriveGeneratePublicUrl, googleDriveListFiles };