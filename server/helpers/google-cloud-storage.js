const GoogleCloudStorage = require('@google-cloud/storage')

const GOOGLE_CLOUD_PROJECT_ID = 'jualeun-qfs'
const GOOGLE_CLOUD_KEYFILE = process.env.CLOUD_KEYFILE

const storage = GoogleCloudStorage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE
})

exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

	
exports.copyFileToGCS = (localFilePath, bucketName, options) => {
    options = options || {};
  
    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);
  
    return bucket.upload(localFilePath, options)
      .then(() => file.makePublic())
      .then(() => exports.getPublicUrl(bucketName, gcsName));
  };