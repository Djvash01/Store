const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);