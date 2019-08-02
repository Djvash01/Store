const {Router} = require('express');
const router = Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const {Types} = require('mongoose');

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

router.delete('/:id',async(req,res)=>{

    if(!Types.ObjectId.isValid(req.params.id)){
        error={
            'code':'1002',
            'description':'El Id de la categoria no es valido'
        };
        res.json({'category':{},error });
    }else{
        const products = await Product.findOne({'category':req.params.id});
        if(!products){
            const category = await Category.findByIdAndDelete(req.params.id);
       
            if (category) {
                res.json({category,'error':{}});
            } else {
                error={
                    'code':'1001',
                    'description':'La categoria no puede ser eliminada porque no existe o ya fue eliminada.'
                };
                res.json({'category':{},error });
            }
        }else{
            error={
                'code':'1000',
                'description':'La categoria no puede ser eliminada por que tiene items asociados.'
            };
            res.json({'category':{},error });
        }

    }

    
    
    
});

module.exports = router;