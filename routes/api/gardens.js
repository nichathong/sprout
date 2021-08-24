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
    GardenPlant.find({owner: req.user.id}).then(gardenPlants => {
        if(gardenPlants.length>=12){
            return res.status(404).json({toomanygardenplants: "You can only add 12 plants!"})
        }else{
            const newGardenPlant = new GardenPlant({
                owner: req.user.id,
                plant: req.params.plant_id,
            })
        
            newGardenPlant.save().then(gardenPlant => res.json(gardenPlant));
        }
    })

})

router.patch("/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    const updatePlant = new GardenPlant({
        _id: req.params.id,
        owner: req.user.id,
        plant: req.body.plant_id,
        nickname: req.body.nickname,
        waterDate: req.body.waterDate,
        date: req.body.date
    })

    GardenPlant.updateOne({_id: req.params.id},updatePlant)
    .then(gardenPlant => res.json(gardenPlant))
    .catch(err =>
        res.status(404).json({ nogardenplantfound: 'fail update' })
    );
})

router.get("/detail/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    GardenPlant.findById(req.params.id)
    .then(gardenPlant => res.json(gardenPlant))
    .catch(err =>
        res.status(404).json({ nogardenplantfound: 'No garden plants found with that id' }))
})

router.delete("/:id",passport.authenticate('jwt', { session: false }),(req,res) =>{
    GardenPlant.deleteOne({_id: req.params.id})
    .then(gardenPlant => res.json(gardenPlant))
    .catch(err =>
        res.status(404).json({ nogardenplantfound: 'No garden plants found with that id, fail delete' }))
})

router.get("/mine",passport.authenticate('jwt', { session: false }),(req,res)=>{
    GardenPlant.find({owner: req.user.id})
    .then(gardenPlant => res.json(gardenPlant))
    .catch(err =>
        res.status(404).json({ nogardenplantfound: 'No garden plants found with that user' })
    ); 
})

router.get("/", passport.authenticate('jwt', { session: false }), (req,res)=>{
    GardenPlant.find()
    .then(gardenPlant => res.json(gardenPlant))
    .catch(err =>
        res.status(404).json({ nogardenplantfound: 'No garden plants found' })
    ); 
})

module.exports = router;
