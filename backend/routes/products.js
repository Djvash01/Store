const { Router } = require('express');
const router = Router();
const Product = require('../models/Product');

router.get('/', async(req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async(req, res) => {
    const { code, name, details, price, category} = req.body;
    const newProduct = new Product({ code, name, details, price, category });
    await newProduct.save();
    res.json(newProduct);
});

router.delete('/:id', async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
});

module.exports = router;