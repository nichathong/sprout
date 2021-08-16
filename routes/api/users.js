const express  = require("express");
const router = express.Router();

router.get("/test",(req,res)=>{
    res.json({msg: "this is user routes"})
})

module.exports = router;
