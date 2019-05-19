const fs = require('fs')
const GoogleCloudStorage = require('@google-cloud/storage')
const GOOGLE_CLOUD_PROJECT_ID = 'jualeun-qfs'
const GOOGLE_CLOUD_KEYFILE = process.env.CLOUD_KEYFILE

const storage = new GoogleCloudStorage.Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE
})

getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

const DEFAULT_BUCKET_NAME = 'jualeun-qfs'

module.exports = function(req,res,next){
    console.log(process.env.CLOUD_KEYFILE)
    let img
    if (req.body.img){
        img = req.body.img
    } else if (req.body.pp){
        img = req.body.pp
    } else {
        return next()
    }
    let extension = req.body.extension
    if(!extension){
        return next()
    }
    let base64Data = img.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    let newFileName = Date.now() + '.' + extension
    let newFile = process.env.FILENAME + newFileName
    fs.writeFile(newFile, base64Data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal server error',
            });
        } else {
            req.file = {}
            req.file.buffer = fs.readFileSync(newFile)
            req.file.originalName = Date.now() + newFileName
            if (extension === 'png') {
                req.file.mimetype = 'image/png'
            } else if (extension === 'jpeg' || extension === 'jpg') {
                req.file.mimetype = 'image/jpg'
            }
            sendUploadToGCS(req, res, next)
        }
    });
}

sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        console.log('there is nothing to upload!');
        next()
    }

    let bucketName = DEFAULT_BUCKET_NAME;
    if(req.body.img){
        bucketName = DEFAULT_BUCKET_NAME
    } else if (req.body.pp) {
        bucketName = DEFAULT_BUCKET_NAME
    }
    const bucket = storage.bucket(bucketName);
    let gcsFileName = `${Date.now()}-${req.file.originalName}`;
    if(req.body.pp){
        gcsFileName = `userPhoto/${gcsFileName}` 
    } else {
        gcsFileName = `productPhoto/${gcsFileName}`
    }
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on('error', (err) => {
        console.log(err)
        req.file.cloudStorageError = err;
        res.status(500).json(err.message);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsFileName;
        return file.makePublic()
            .then(() => {
                req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                console.log('Your file has been uploaded successfully!', req.file)
                if(req.body.pp){
                    req.body.pp = req.file.gcsUrl
                } else if (req.body.img) {
                    req.body.img = req.file.gcsUrl
                }
                next()
            });
    });
    stream.end(req.file.buffer);
};