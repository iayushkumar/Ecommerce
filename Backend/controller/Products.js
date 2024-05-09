const Products=require('../Model/Products')

const createproducts =async (req,res)=>
{
try {
const prod=req.body;
console.log(prod);
const newprod= new Products(prod)
console.log(newprod)
await newprod.save();
res.status(200).json({prod:prod})
    
} catch (error) {
    console.error(error);
    res.status(500).json({msg:"Some error occurs"})
}
}

const deleleproduct=async(req,res)=>
{
    try {
     const id=req.params.id;
     const prod=await Products.findByIdAndDelete(id);

     if(!prod)
     {
        res.status(500).json({msg:"Not able to delete"})
     }
     res.status(200).json({msg:"succesfully deleted"})    
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Some error occurs"})
    }
}


const fetchallproduct=async(req,res)=>{
    try{
      const prod= await Products.find();
      if(!prod)
      {
        res.status(400).json({msg:"No product found"})
      }
      res.status(200).json({prod:prod})
     }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Some error occurs"})
    }
}

const fetchproduct=async(req,res)=>{
    try{
       
        const id=req.params.id;
        console.log(id);
        
      const prod= await Products.findById(id);
      if(!prod)
      {
        res.status(400).json({msg:"Some error occurs inside"})
      }
      res.status(200).json({prod:prod})
     }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Some error occurs"})
    }
}



module.exports={createproducts,deleleproduct,fetchallproduct,fetchproduct}