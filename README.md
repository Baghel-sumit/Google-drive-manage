
# Google Drive folder management

It is the project which is based on node.js with googleapis package to handle google drive folder and it's inner files or folders. This is only backend with four APIs to list, upload file/files, download with public url and the last one is to delete the file.

To get credentials of google console to interact with google drive, please follow below steps -

#### 1. Go to [google console](https://console.cloud.google.com/).
#### 2. On Welcome page go to API and Services and search under library "google drive api".
#### 3. Select first item and enable the api then click on Manage button
#### 4. In credentials section, click on create credentials and choose service account then fill the form and download the credentials in json file.
#### 5. Copy the email and go to your desired google drive and share any folder to that email.

Now, you can continue with project, follow these steps after clone or fork the repository -

## Environment variables

Create a .env file to manage these variables :

```bash
    DRIVE_FOLDER_ID = (required) the folder id, in which you want to do management
    CLIENT_EMAIL = (required)  client_email, which you got from service account of google drive json file
    PRIVATE_KEY = (required)  private_key, which you got from service account of google drive json file
```

## Commands to start the project

```bash
    npm install
    npm run dev
```

The project will run on - http://localhost:5000

## How to interact with provided google drive folder

We have four APIs to perform actions like list, upload and download a file or files : 

### 1. To upload a file

Please copy this curl to upload any file or files -

```bash
curl --location 'http://localhost:5000/api/v1/uploadFiles' \
--form 'files=@"/D:/pictures/Screenshots/corner.png"'
```

#### Note: Provide file/files from your local machine to upload.

The reponse of above API, if Successfully uploaded, will look like below -

```bash
{
    "status": "success",
    "message": "Successfully uploaded files/file."
}
```

### 2. To list the files

Please copy this curl to get the list of files -

```bash
curl --location 'http://localhost:5000/api/v1/listFiles?limit=number&nextPageToken=--next-page-token---'
```
The reponse of above API, if Successfully uploaded, will look like below -

```bash
{
    "status": "success",
    "nextPageToken": "nextPageTokenString",
    "files": [
        {
            "id": "1nextOvZoFWM3U5EUGG17QkdqBeB-5wgp",
            "name": "Screenshot 2023-09-21 145628.png"
        },
        {
            "id": "12lGSX78F3LU4Uz6dAX1INea2fNau2GSj",
            "name": "Screenshot 2023-09-21 145616.png"
        },
        {
            "id": "1PQSUrmZiMzZtSCsECLe-5f1eSdoSPvmg",
            "name": "Screenshot 2023-09-20 192557.png"
        },
        {
            "id": "1WYOBEW98R6WpfEsyKAcGyz2FFWMW8y-x",
            "name": "Screenshot 2023-09-13 194705.png"
        },
        {
            "id": "1quwpIqwpAFprn_gZLxf1IwWGMPeEw2VG",
            "name": "Screenshot 2023-09-13 185404.png"
        }
    ]
}
```

### 3. To delete the file using file id

Please copy this curl to delete the file using file id -

```bash
curl --location 'http://localhost:5000/api/v1/deleteFile/:id'
```
#### Note: Don't forget to replace ':id' with a file id.

The reponse of above API, if Successfully uploaded, will look like below -

```bash
{
    "status": "success",
    "message": "Successfully, deleted file"
}
```

### 4. To get the public url with download link

Please copy this curl to get the public url with download link if file exists - 

```bash
curl --location 'http://localhost:5000/api/v1/publicUrl/:id'
```

#### Note: Don't forget to replace ':id' with a file id.

The reponse of above API, if Successfully uploaded, will look like below -

```bash
{
    "status": "success",
    "webContentLink": "Google_drive_download_link",
    "webViewLink": "Public_url_to_view_file"
}
```

## Important Links for documentation

#### > [Google SDK docs](https://cloud.google.com/sdk/docs)

## Author

[Sumit Baghel](https://github.com/Baghel-sumit)