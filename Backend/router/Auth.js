const express = require('express');
const router = express.Router();
const {signup,getuserInfo,login}= require('../controller/Auth'); 
const {fetchdata} =require('../middleware/fetchdata')


router.post('/sign', signup); 
router.post('/log', login); 
router.get('/signinfo',fetchdata,getuserInfo ); 

module.exports = router;
