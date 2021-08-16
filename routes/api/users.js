const express  = require("express");
const router = express.Router();
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')
const jwt = require("jsonwebtoken")
const passport  = require("passport")

const validLogin = require("../../validation/login")
const validRegister = require("../../validation/register")

router.get("/test",(req,res)=>{
    res.json({msg: "this is user routes"})
})

router.post("/register",(req,res) =>{
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if (err) throw err;
                newUser.password =hash;
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            })
        })

      
    }
    })
})


router.post("/login",(req,res)=>{
  const email = req.body.email;
  const password= req.body.password;
  User.findOne({ email })
  .then(user=>{
    if(!user){
      return res.status(404).json({email: 'This user does not exist'});
    }

    bcrypt.compare(password, user.password)
     .then(isMatch =>{
       if(isMatch){
        const payload ={
          id: user.id,
          email: user.email
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
          res.json({
              success: true,
              token: 'Sprout' + token
          });
        });

       }else{
        return res.status(404).json({password: 'Invalid Password'});
       }
     })
  })
})


module.exports = router;
