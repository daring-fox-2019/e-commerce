const vision = require('@google-cloud/vision');

module.exports = function (req, res, next) {

    const client = new vision.ImageAnnotatorClient({
        keyFilename: process.env.keyfile
    });

    client
        .labelDetection(req.file.gcsUrl)
        .then(results => {

            const labels = results[0].labelAnnotations;

            labels.forEach(el => {
                delete el.locations
                delete el.properties
                delete el.mid
                delete el.locale
                delete el.confidence
                delete el.boundingPoly
                el.text = el.description
                delete el.description
                delete el.topicality
                delete el.score
                el.tiClasses=['ti-valid']
            })

            req.file.labels = labels
            next()


            //delete file from bucket
            // storage
            //     .bucket(process.env.CLOUD_BUCKET)
            //     .file(OBJECT_NAME)
            //     .delete()
            // .then( data => {
            //     console.log('delete from bucket success')
            // })
            // .catch( err => {
            //     next(err)
            // })

        })
        .catch(err => {
            next(err)
        });
}