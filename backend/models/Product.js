const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);