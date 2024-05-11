const mongoose = require('mongoose');

const informasi = new mongoose.Schema({
    title: { type: String, required: true, title: 'Title' },
    content: { type: String, required: true, title: 'Content' },
    image: [{ type: String, required: true, title: 'Image' }],
}, {timestamps: true});

module.exports = mongoose.model('informasi',informasi);
