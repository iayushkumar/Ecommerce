const express=require('express');
const router=express.Router();
const {fetchdata} =require('../middleware/fetchdata')
const {addaddress} =require('../controller/Address')

router.post('/Addaddress',fetchdata,addaddress)


module.exports=router;