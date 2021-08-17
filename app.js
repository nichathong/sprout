const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI
const users = require("./routes/api/users")
const plants = require("./routes/api/plants");
const gardens = require("./routes/api/gardens")
const path = require('path');


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

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
    res.send("Hello World");
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users",users);
app.use("/api/plants",plants);
app.use("/api/gardens",gardens)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{console.log(`Listen on port ${port}`)})