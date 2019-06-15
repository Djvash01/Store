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
    if(!duplicate){
        const category = new Category({name});
        await category.save();
        res.json({
            category,
            'error':{}
        }); 
    }else{
        error={
            "code":"1001",
            'description':'Categoria ya existente'
        };
        res.json({'category':{}, error});
    }
   
});

router.delete('/:name',async(req,res)=>{
    const products = await Product.findOne({'category.name':req.params.name});
   
    if(!products){
        const category = await Category.findOneAndDelete({name:req.params.name});
        res.json({category,'error':{}});
    }else{
        error={
            'code':'1000',
            'description':'La categoria no puede ser eliminada por que tiene items asociados.'
        };
        res.json({'category':{},error });
    }
    
    
    
});

module.exports = router;