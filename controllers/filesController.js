const { googleDriveUploader, googleDriveDeleteFile, googleDriveListFiles, googleDriveGeneratePublicUrl } = require("../services/googleApi");
const { SUCCESS, FAILURE } = require('../constants');

const uploadFiles = async (req, res) => {
  try {
    const { files } = req;

    for(let fileIdx = 0; fileIdx < files.length; fileIdx += 1 ) {
      await googleDriveUploader(files[fileIdx]);
    }

    res.status(200).json({
      status: SUCCESS,
      message: 'Successfully uploaded files/file.'
    })
  } catch (error) {
    res.status(500).json({
      status: FAILURE,
      message: error.message
    });
  }
}

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await googleDriveDeleteFile(id);

    if (result.status !== SUCCESS) throw new Error(result.error);

    res.status(200).json({
      status: SUCCESS,
      message: 'Successfully, deleted file'
    })
  } catch (error) {
    res.status(500).json({
      status: FAILURE,
      message: error.message
    })
  }
}

const listFiles = async (req, res) => {
  try {
    const { nextPageToken, limit } = req.query;
    const result = await googleDriveListFiles(limit, nextPageToken);
    if(result.status !== SUCCESS) throw new Error(result.error);

    res.status(200).json({
      status: SUCCESS,
      ...result.data
    })
  } catch (error) {
    res.status(500).json({
      status: FAILURE,
      message: error.message
    })
  }
}

const getPublicUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await googleDriveGeneratePublicUrl(id);

    if(result.status !== SUCCESS) throw new Error(result.error);

    res.status(200).json({
      status: SUCCESS,
      ...result.data
    });

  } catch (error) {
    res.status(500).json({
      status: FAILURE,
      message: error.message
    })
  }
}

module.exports = { uploadFiles, deleteFile, listFiles, getPublicUrl };