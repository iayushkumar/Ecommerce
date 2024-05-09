const mongoose =require('mongoose');

const Connectodb=async()=>
{
    const db= await mongoose.connect('mongodb://localhost:27017/backendforeco');
    return db;
}


module.exports= Connectodb;