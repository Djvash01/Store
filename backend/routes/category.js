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
    const duplicate = await Category.findOne({name:name});
    errors=[];
    if(!duplicate){
        const category = new Category({name});
        await category.save();
        res.json({
            category,
            errors
        }); 
    }else{
        error={
            "code":"1001",
            'description':'Categoria ya existente'
        };
        errors.push(error);
        res.json({errors});
    }
   
});

router.delete('/:name',async(req,res)=>{
    const products = await Product.findOne({'category.name':req.params.name});
    errors=[];
    if(!products){
        const category = await Category.findOneAndDelete({name:req.params.name});
        res.json({category,errors});
    }else{
        error={
            'code':'1000',
            'description':'La categoria no puede ser eliminada por que tiene items asociados.'
        };
        errors.push(error);
        res.json({'category':[],errors });
    }
    
    
    
});

module.exports = router;