const express = require('express');
const router = express.Router();
let mongoose = require('mongoose')
const server = '127.0.0.1:27017'
const database = 'sarc'
mongoose.connect('mongodb://localhost:27017/flights', {useNewUrlParser: true});
let usermodel=require('../models/user')
router.post('/new_user',(req,res)=>{
    // console.log(req.body)
    let model = new usermodel(req.body)
    model.save()
    .then(doc=>{
        // console.log(doc)
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
router.get('/all_users',(req,res)=>{
    usermodel.find({})
    .then(doc=>{
        // console.log(doc)
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    // res.send("something went wrong")
})
router.get('/bookings',(req,res)=>{
    usermodel.find({
        name:req.body.name
    })
    .then(doc=>{
        res.json({
            bookings:doc[0].bookings
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router;