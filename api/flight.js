const express = require('express');
const router = express.Router();
let mongoose = require('mongoose')
const server = '127.0.0.1:27017'
const database = 'sarc'
mongoose.connect('mongodb://localhost:27017/flights', {useNewUrlParser: true});
const flightmodel = require('../models/flight_model')
let usermodel=require('../models/user')
router.get('/test',(req,res)=>{
    res.json({
        message:"welcome to test"
    })
})
router.post('/new_flight',(req,res)=>{
    // console.log(req.body)
    let model = new flightmodel(req.body)
    model.save()
    .then(doc=>{
        // console.log(doc)
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
router.get('/all_flights',(req,res)=>{
    flightmodel.find({})
    .then(doc=>{
        // console.log(doc)
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    // res.send("something went wrong")
})
router.get('/search',(req,res)=>{
    console.log(req.body.date)
    // res.send("still working on the feature")
    flightmodel.find({
        source:req.body.source,
        destination:req.body.destination,
        date:req.body.date
    })
    .then(doc=>{
        console.log(doc)
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
router.get('/reserve',(req,res)=>{
    flightmodel.find({
        _id:req.body.idn
    })
    .then(doc=>{
        if(doc[0].seats>=doc[0].booked+req.body.nos){
        // console.log(doc)
        // console.log(doc[0].booked)
        let tmp=doc[0].booked+req.body.nos
        doc[0].booked=tmp
        // console.log(tmp)
        doc[0].save()
        usermodel.find({
            name:req.body.name
        })
        .then(doc2=>{
            x={
                "id":doc[0]._id,
                "source":doc[0].source,
                "destination":doc[0].destination,
                "nos":req.body.nos,
                "date":doc[0].date
            }
            doc2[0].bookings.push(x)
            doc2[0].save()
            console.log(doc2)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        



        // doc[0].save()
        res.send("success")
        }
        else{
            res.send("Seats not available")
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router;