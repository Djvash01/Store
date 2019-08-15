const { Schema, model, Decimal128 } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Decimal128, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);