const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport  = require("passport");
const Plant = require("../../models/Plant");
const Garden = require("../../models/Garden");

router.get("/test",(req,res)=>{
    res.json({msg: "this is garden routes"})
})

module.exports = router;
