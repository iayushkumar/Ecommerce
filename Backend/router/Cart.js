const express=require('express')
const router=express.Router();
const {fetchdata}=require('../middleware/fetchdata')

const {Addtocart,fetchcartdata,deletecart,deleteAllCartItems}= require('../controller/Cart');



router.post('/addtocart',fetchdata,Addtocart)
router.get('/fetchcart',fetchdata,fetchcartdata)
router.delete('/deletecartitem',fetchdata,deletecart)
router.delete('/delete_AllCartItems',fetchdata,deleteAllCartItems)

module.exports=router;