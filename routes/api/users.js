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

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    garden: req.user.garden,
    public: req.user.public
  })
})

router.post("/register",(req,res) =>{
    const {errors, isValid} = validRegister(req.body)

    if(!isValid){
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if (err) throw err;
                newUser.password =hash;
                newUser.save().then(user => {
                  const payload={
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
                        token: 'Bearer ' + token
                    });
                  });          

                }).catch(err => console.log(err));
            })
        })

      
    }
    })
})


router.post("/login",(req,res)=>{
  const {errors, isValid} = validLogin(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
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
              token: 'Bearer ' + token
          });
        });

       }else{
        return res.status(404).json({password: 'Invalid Password'});
       }
     })
  })
})

router.patch("/:id", passport.authenticate('jwt', {session: false}),(req,res)=>{
   const updateUser =new User({
      _id: req.params.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      password: req.user.password,
      garden: req.body.garden,
      public: req.body.public
   })

   User.updateOne({_id: req.params.id}, updateUser)
   .then(user => res.json(user))
    .catch(err =>
        res.status(404).json({ nouserfound: 'update failed' })
    );

})

//index all users 
router.get("/publicGardens",passport.authenticate('jwt', {session: false}),(req,res)=>{
    User.find({public: true })
    .then(user => res.json(user))
    .catch(err =>
        res.status(404).json({ nouserfound: 'no public gardens' })
    );
})


module.exports = router;
