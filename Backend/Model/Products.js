const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    breadcrumbs: [{ type: String }],
    images: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    description: { type: String, required: true },
    highlights: [{ type: String }],
    details: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
