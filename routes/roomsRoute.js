const express = require("express");
const { async } = require("rxjs");
const router = express.Router();

const Room = require('../models/rooms');

router.get("/getAllRooms", async(req,res)=>{

    try{
        const rooms = await Room.find({})
        res.send(rooms);
    }
    catch(error){
        return res.status(400).json({message: error});
    }

})

module.exports = router;
