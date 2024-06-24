const mongoose = require('mongoose');

const portal = new mongoose.Schema({
    title: { type: String, required: true, title: 'Title' },
    content: { type: String, required: true, title: 'Content' },
    img: [{ type: String, required: true, title: 'Image' }],
}, { timestamps: true });


module.exports = mongoose.model('portal',portal);
