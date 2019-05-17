const { Schema, model } = require('mongoose');
const CategorySchema = require('../models/Category').schema;

const ProductSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: String, required: true },
    category: [CategorySchema],
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);