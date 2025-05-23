const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, required: true },
    images: { type: String, required: true }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

module.exports = News;