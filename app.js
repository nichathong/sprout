const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI
const users = require("./routes/api/users")
const User  = require("./models/User");
const plants = require("./routes/api/plants");
const Plant = require("./models/Plant")



const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
.connect(db, {useNewUrlParser: true})
.then(()=>console.log('connet to mongoDB'))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
    // const user =new User({
    //     email: 'demo1@gmail.com',
    //     password:'123456'
    // });
    // user.save()
    res.send("Hello aa");
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users",users);
app.use("/api/plants",plants)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{console.log(`Listen on port ${port}`)})