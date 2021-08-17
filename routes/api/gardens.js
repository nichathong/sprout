const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport  = require("passport");
const Plant = require("../../models/Plant");
const GardenPlant = require("../../models/GardenPlant");

router.get("/test",(req,res)=>{
    res.json({msg: "this is garden routes"})
})

router.post("/new/:plant_id",passport.authenticate('jwt', { session: false }),(req, res)=>{
    const newGardenPlant = new GardenPlant({
        owner: req.user.id,
        plant: req.params.plant_id,
    })

    newGarden.save().then(garden => res.json(garden));

})

router.get("/mine",passport.authenticate('jwt', { session: false }),(req,res)=>{
    GardenPlant.find({owner: req.user.id})
    .then(garden => res.json(garden))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that tag' })
    ); 
})

module.exports = router;
