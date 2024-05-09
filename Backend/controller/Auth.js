const User = require('../Model/User');
const secret_key="Iamayush"
var jwt = require('jsonwebtoken');

const signup = async (req, res) => {

    try {
      const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });

        }
     const newUser = new User(user);
     await newUser.save();
    

     const responsecode=200;
          
     const user_token_data={
         userid:newUser._id,
         username:newUser.name,
         userrole:newUser.role
     }
     
   const token=jwt.sign(user_token_data,secret_key);
     res.status(200).json({
         responsecode,token
     })
   } catch (error) {
       console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login=async(req,res)=>{
    const user=req.body;
    const {email,password}=user;
    
    const existingUser=await User.findOne({email:email})
    if(existingUser)
    { console.log(existingUser);
        if(existingUser.password==password)
        {
            // res.status(200).json({user:existingUser.name})
            const responsecode=200;
          
            const user_token_data={
                userid:existingUser._id,
                username:existingUser.name,
                userrole:existingUser.role
            }
            
          const token=jwt.sign(user_token_data,secret_key);
            res.status(200).json({
                responsecode,token
            })
        }
        else
        {
            res.status(200).json("bhak sala");
        }
    }}


const getuserInfo=async(req,res)=>{
    try{
   
     const id = req.User.userid;
     
     console.log(id ,"user info")
     
     const existingUser= await User.findOne({_id:id})
     console.log(existingUser)
     if(!existingUser)
     {
        res.status(400).json({msg:"no user found"});
     }

     const { name, email, Address,role } = existingUser;

     res.status(200).json({ name, email, Address,role });

    }
    catch(error){
        console.error(error);
        res.send(500).json({error:'Internal server error'})

    }
}

module.exports = {signup,getuserInfo,login};