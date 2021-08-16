const express  = require("express");
const router = express.Router();
const User = require("../../models/User")
const bcrypt = require("bcryptjs")

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

module.exports = router;
