const express = require("express");
const { async } = require("rxjs");
const router = express.Router();

const User = require('../models/user');

router.post("/register", async(req,res)=>{

  const newUser = new User({name: req.body.name , password: req.body.password , email: req.body.email})

  try{
      const user = await newUser.save()
      res.send(newUser);
  }
  catch(error){
      return res.status(400).json({message: error});
  }

})


router.post("/login", async(req,res)=>{


  try{
      const user = await User.findOne({password: req.body.password , email: req.body.email})
      if(user){
        res.send(user);
      }
      else{
        return res.status(400).json({message: 'Login Failed'});
      }
  }
  catch(error){
      return res.status(400).json({message: error});
  }

})


module.exports = router;
