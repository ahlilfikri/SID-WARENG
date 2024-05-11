const mongoose = require('mongoose');

const kegiatan = new mongoose.Schema({
    title: { type: String, required: true, title: 'Title' },
    content: { type: String, required: true, title: 'Content' },
    image: [{ type: String, required: true, title: 'Image' }],
}, {timestamps: true});

module.exports = mongoose.model('kegiatan',kegiatan);
