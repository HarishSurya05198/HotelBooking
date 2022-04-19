const express = require("express");

const app = express();
const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const port = process.env.PORT || 4000;

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200
}

app.use(express.json())

app.use(cors({
  origin: 'http:localhost:8000'
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET, POST, DELETE, PUT");
    next();
});
app.use(cors())
app.use('/api/rooms',roomsRoute);
app.use('/api/user',userRoute)
app.listen(port, ()=>console.log("Harish Surya server running on port ",port))
