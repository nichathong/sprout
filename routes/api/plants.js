const express  = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const passport  = require("passport")
const Plant = require("../../models/Plant")

router.get("/test",(req,res)=>{
    res.json({msg: "this is plant routes"})
})

router.post("/new",passport.authenticate('jwt', { session: false }),(req,res)=>{
    const newPlant = new Plant({
        author: req.user.id,
        name: req.body.name,
        // tags: req.body.tags,
        // waterLevel: req.body.waterLevel,
        // light: req.body.light,
        // temperature: req.body.temperature,
        // level: req.body.level,
        // waterFrequency: req.body.waterFrequency,
        // photoUrls: req.body.photoUrls

    });
    newPlant.save().then(plant => res.json(plant))
})


module.exports = router
