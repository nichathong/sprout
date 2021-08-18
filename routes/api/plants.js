const express  = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport  = require("passport");
const Plant = require("../../models/Plant")
const validPlant =  require("../../validation/plant")
const multer = require("multer");
const keys = require("../../config/keys")
var AWS = require("aws-sdk");


var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



router.get("/test",(req,res)=>{
    res.json({msg: "this is plant routes"})
})

// //create
router.post("/new",passport.authenticate('jwt', { session: false }),upload.single("file"),(req,res)=>{
    const {errors, isValid} = validPlant(req.body)

    if(!isValid){
      return res.status(400).json(errors);
    }

    Plant.findOne({name: req.body.name.toLowerCase()})
    .then( plant => {
        if(plant){
            return res.status(400).json({name: "this plant name already exist"})
        }else{
            if(req.file!==undefined){
                let s3bucket = new AWS.S3({
                    accessKeyId: keys.awsAccessKeyId,
                    secretAccessKey: keys.awsSecretAccessKey,
                    region: 'us-east-2'
                  });
                let file;
                const S3_BUCKET = "sprout-app";
                file = req.file;
                var params = {
                    Bucket: S3_BUCKET,
                    Key: file.originalname,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: "public-read"
                  }; 
                  s3bucket.upload(params, (err, data) => {
                    if (err) {
                      res.status(500).json({ error: true, Message: err });
                    } else {
                      res.send({ data });
                      var newFileUploaded = {
                        author: req.user.id,
                        name: req.body.name.toLowerCase(),
                        tags: req.body.tags,
                        waterLevel: req.body.waterLevel,
                        light: req.body.light,
                        temperature: req.body.temperature,
                        level: req.body.level,
                        waterFrequency: req.body.waterFrequency,
                        photoUrls: [`https://${S3_BUCKET}.s3.amazonaws.com/${file.originalname}`]
                      };
                      const newPlant = new Plant(newFileUploaded);
                      newPlant.save().then(plant => res.json(plant))
                    }
                  })
            }else{
                const newPlant = new Plant({
                    author: req.user.id,
                    name: req.body.name.toLowerCase(),
                    tags: req.body.tags,
                    waterLevel: req.body.waterLevel,
                    light: req.body.light,
                    temperature: req.body.temperature,
                    level: req.body.level,
                    waterFrequency: req.body.waterFrequency,
                    photoUrls: ['https://sprout-app.s3.us-east-2.amazonaws.com/Sprout.png']
                });
                newPlant.save().then(plant => res.json(plant))
            }
            
           }
      })
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
    Plant.find({tags: req.params.tag.split('+').join(" ").toLowerCase()})
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
        res.status(404).json({ noplantfound: 'No plants found with that level' })
    ); 
})

//search by name
router.get("/searchname/:name",(req,res)=>{
    Plant.find({name: req.params.name.split('+').join(" ").toLowerCase()})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that name' })
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
    const {errors, isValid} = validPlant(req.body)

    if(!isValid){
      return res.status(400).json(errors);
    }

    if(req.file!==undefined){
        let s3bucket = new AWS.S3({
            accessKeyId: keys.awsAccessKeyId,
            secretAccessKey: keys.awsSecretAccessKey,
            region: 'us-east-2'
          });
        let file;
        const S3_BUCKET = "sprout-app";
        file = req.file;
        var params = {
            Bucket: S3_BUCKET,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
          }; 
          s3bucket.upload(params, (err, data) => {
            if (err) {
              res.status(500).json({ error: true, Message: err });
            } else {
              res.send({ data });
              var newFileUploaded = {
                _id: req.params.id,
                author: req.user.id,
                name: req.body.name.toLowerCase(),
                tags: req.body.tags,
                waterLevel: req.body.waterLevel,
                light: req.body.light,
                temperature: req.body.temperature,
                level: req.body.level,
                waterFrequency: req.body.waterFrequency,
                photoUrls: req.body.photoUrls.concat(`https://${S3_BUCKET}.s3.amazonaws.com/${file.originalname}`)
              };
              const updatePlant = new Plant(newFileUploaded);
                Plant.updateOne({_id: req.params.id}, updatePlant)
                .then(plant => res.json(plant))
                .catch(err =>
                    res.status(404).json({ noplantfound: 'fail update' })
                );
        
            }
          })
    }else{

        const updatePlant = new Plant({
            _id: req.params.id,
            author: req.user.id,
            name: req.body.name.toLowerCase(),
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
      
    }

    // const updatePlant = new Plant({
    //     _id: req.params.id,
    //     author: req.user.id,
    //     name: req.body.name.toLowerCase(),
    //     tags: req.body.tags,
    //     waterLevel: req.body.waterLevel,
    //     light: req.body.light,
    //     temperature: req.body.temperature,
    //     level: req.body.level,
    //     waterFrequency: req.body.waterFrequency,
    //     photoUrls: req.body.photoUrls
    // }); 

    // Plant.updateOne({_id: req.params.id}, updatePlant)
    // .then(plant => res.json(plant))
    // .catch(err =>
    //     res.status(404).json({ noplantfound: 'fail update' })
    // );
        
})

//delete plant
router.delete("/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    Plant.deleteOne({_id: req.params.id})
    .then(plant => res.json(plant))
    .catch(err =>
        res.status(404).json({ noplantfound: 'No plants found with that id, fail delete' }))
    
})



module.exports = router;
