const {Router} = require('express');
const router = Router();
const Category = require('../models/Category');

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

router.delete('/:id',async(req,res)=>{
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.json(deletedCategory);
});

module.exports = router;