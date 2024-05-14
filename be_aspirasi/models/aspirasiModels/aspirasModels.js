const mongoose = require('mongoose');

const aspirasiModel = new mongoose.Schema({
    autohor: { type: String, required: true, default: 'dari seorang warga' },
    aspirasi: { type: String, required: true },
    warga: { type: mongoose.Schema.Types.ObjectId, ref: 'warga' },
    validator: { type: mongoose.Schema.Types.ObjectId, ref: 'validator' },
    isPublish: { type: Boolean, default: false },
}, {timestamps: true});

module.exports = mongoose.model('aspirasi', aspirasiModel);
