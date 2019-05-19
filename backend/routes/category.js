const {Router} = require('express');
const router = Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', async(req, res)=>{
    const category = await Category.find();
    res.json(category);
});

router.post('/',async(req, res)=>{
    const { name } = req.body;
    const category = await Category.findOne({name:name});
    if(!category){
        const newCategory = new Category({name});
        await newCategory.save();
        res.json(newCategory); 
    }else{
        res.json({
            "code":"1001",
            'description':'Categoria ya existente'
        });
    }
   
});

router.delete('/:name',async(req,res)=>{
    const products = await Product.findOne({'category.name':req.params.name});
    console.log(products);
    if(!products){
        const deletedCategory = await Category.findOneAndDelete({name:req.params.name});
        res.json(deletedCategory);
    }else{
        res.json({
            'code':'1000',
            'description':'La categoria no puede ser eliminada por que tiene items asociados.'
        });
    }
    
    
    
});

module.exports = router;