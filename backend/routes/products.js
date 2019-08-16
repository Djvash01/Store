const {
    Router
} = require('express');
const router = Router();
const Product = require('../models/Product');
const {Types} = require('mongoose');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const {
        code,
        name,
        details,
        price,
        category
    } = req.body;
    const newProduct = new Product({
        code,
        name,
        details,
        price,
        category
    });
    await newProduct.save();
    res.json(newProduct);
});

router.delete('/:id', async (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        error = {
            'code': '1006',
            'description': 'El Id del producto no es valido'
        };
        res.json({
            'product': {},
            error
        });
    } else {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.json({
                deletedProduct,
                'error': {}
            });
        } else {
            error = {
                'code': '1005',
                'description': 'El producto no puede ser eliminado porque no existe o ya fue eliminado.'
            };
            res.json({
                'product': {},
                error
            });
        }
    }
});

module.exports = router;