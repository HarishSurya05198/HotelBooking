const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://HarishSurya:popeyetsm@cluster0.yt2nm.mongodb.net/mean-rooms';

mongoose.connect(mongoURL,{useUnifiedTopology:true, useNewUrlParser:true});

var connection = mongoose.connection;

connection.on('error',()=>{
    console.log("Mongo DB server connection failed");
})
connection.on('connected',()=>{
    console.log("Mongo DB server connection success");
})

module.exports = mongoose;