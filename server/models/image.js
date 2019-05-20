const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    image: {
        type: String,
        required: [true, 'image url must not be null']
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'must be logged in to upload pics']
    }
});
const Image = mongoose.model('Image', imageSchema)
module.exports = Image