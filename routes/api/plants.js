const express  = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport  = require("passport");
const Plant = require("../../models/Plant")

router.get("/test",(req,res)=>{
    res.json({msg: "this is plant routes"})
})

//create
router.post("/new",passport.authenticate('jwt', { session: false }),(req,res)=>{
    const newPlant = new Plant({
        author: req.user.id,
        name: req.body.name,
        tags: req.body.tags,
        waterLevel: req.body.waterLevel,
        light: req.body.light,
        temperature: req.body.temperature,
        level: req.body.level,
        waterFrequency: req.body.waterFrequency,
        photoUrls: req.body.photoUrls
    });
    newPlant.save().then(plant => res.json(plant))
})

//index
router.get("/",(req,res)=>{
    Plant.find()
    .sort({date: -1})
    .then(plants => res.json(plants))
    .catch(err => res.status(404).json({ notweetsfound: 'No plants found' }));
})

//show
router.get("/:id",(req,res)=>{
    Plant.findById(req.params.id)
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plant found with that ID' })
    );
})

//search by tag
router.get("/searchtag/:tag",(req,res)=>{
    Plant.find({tags: req.params.tag.split('+').join(" ")})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that tag' })
    ); 
})

//search by level
router.get("/searchlevel/:level",(req,res)=>{
    Plant.find({level: req.params.level})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that tag' })
    ); 
})

//find by userId
router.get("/user/:user_id",(req,res)=>{
    Plant.find({author: req.params.user_id})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that author' })
    );
        
})

//update plant
router.patch("/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    const updatePlant = new Plant({
        _id: req.params.id,
        author: req.user.id,
        name: req.body.name,
        tags: req.body.tags,
        waterLevel: req.body.waterLevel,
        light: req.body.light,
        temperature: req.body.temperature,
        level: req.body.level,
        waterFrequency: req.body.waterFrequency,
        photoUrls: req.body.photoUrls
    }); 

    Plant.updateOne({_id: req.params.id}, updatePlant)
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'fail update' })
    );
        
})

//delete plant
router.delete("/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    Plant.deleteOne({_id: req.params.id})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that id, fail delete' }))
    
})



module.exports = router;
