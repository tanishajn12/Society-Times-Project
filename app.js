const express = require("express");
const app = express();
const path = require("path");
const eventRoutes = require("./routes/event");
const mongoose = require('mongoose');
const seedDB = require('./seed');
// const flash = require("connect-flash");

mongoose.connect('mongodb://127.0.0.1:27017/college') //returns a promise
.then(()=>{console.log("DB connected")})
.catch((err)=> {console.log("Error is:",err)})

app.set("view engine",'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());


app.use(eventRoutes);

// seedDB(); //run only once

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server running at port : ${PORT}`)
})