const express = require("express");
const { async } = require("rxjs");
const router = express.Router();

const Booking = require('../models/booking');

router.post("/bookRoom", async(req,res)=>{
  const {room,roomId,userId,fromDate,toDate,totalAmount,totalDays} = req.body;
  const newBooking = new Booking({
    room,
    roomId,
    userId,
    fromDate,
    toDate,
    totalAmount,
    totalDays,
    transactionId : '1234',
  })
  try{


    const booking = await newBooking.save();
    res.send(newBooking);
  }
  catch(error){
    return res.status(400).json({message: 'Booking Failed'});
  }
})

module.exports = router;
