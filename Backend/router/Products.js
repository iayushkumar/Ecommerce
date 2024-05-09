const express=require('express')
const router=express.Router();
const {createproducts,deleleproduct,fetchallproduct,fetchproduct}=require('../controller/Products')

router.post('/create',createproducts)
router.delete('/delete/:id',deleleproduct)
router.get('/fetchAllprod',fetchallproduct)
router.get('/fetchprod/:id',fetchproduct)

module.exports=router;
