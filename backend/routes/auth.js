const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/Fetchuser');
const { body, validationResult } = require('express-validator');
const SecJwt ="youareunderabhi$dollar";



// Route 1 : creating a new user 
router.post('/createuser' , [
   body('email' ,  'enter a valid email').isEmail(),
   body('password' , 'password must contain 5 characters').isLength({ min: 5 }),
   body('name' ,'name length must be of 5 ').isLength({ min: 5 }),
], async (req, res)=>{
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

  // check whether a user is already with name and this email or not?
  try {
  let  user = await User.findOne({email : req.body.email});
  if(user){
   // success=true;
   return res.status(400).json({ success , error : "Sorry , the user with this email exists already!"});
  }
  
  const salt = await bcrypt.genSaltSync(10);
  const secretpass= await bcrypt.hash(req.body.password , salt);
   
  
    user = await User.create({
      name: req.body.name,
      password: secretpass,
      email:req.body.email
    })
  const userid = {
   user : {
      id: user.id
   }
  }
    const authtoken= jwt.sign(userid , SecJwt);
    success= false;
    res.json({ success , authtoken});
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Some error occured in server");
   }
   //  .then(user => res.json(user)).catch((err)=>{
   //    console.log(err);
   //    res.json({error : 'please enter an unique value for email'});
   //  })
});


// Route 2 : login page and check whether exist or not
//authentication , login 

router.post('/login', [
   body('email',  'enter a valid email').isEmail(),
   body('password' , "Password can't be blank").exists()
] , async(req, res)=>{
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      
     return res.status(400).json({ errors: errors.array() });
   }

   const{email , password} = req.body;

   try {
      let user= await User.findOne({email});
      if(!user){
        
          return  res.status(400).json({success , error: "Please try to login with correct credentials"});
      }
      const passwordcompare =  await bcrypt.compare(password , user.password);
      if(!passwordcompare){
         
         return  res.status(400).json({success ,error: "Please try to login with correct credentials"});
     }

     const userid = {
      user : {
         id: user.id
      }
     }
       const authtoken= jwt.sign(userid , SecJwt);
       success = true;
       res.json({success , authtoken});
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured in server in login");
    }

})

// Route 3 , Fetch user details....
router.post('/getuser' , fetchuser , async(req, res)=>{
  

try {
  const   userId=req.user.id;
   const user = await User.findById(userId).select("-password");
   res.send(user);
} catch (error) {
   console.error(error.message);
   res.status(500).send("internal server error");
}
});


module.exports = router;