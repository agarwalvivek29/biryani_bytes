const { Router } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET=process.env.JWT_SECRET;

const { User } = require('../db');

const router = Router();

router.get('/username_avl/:username', async(req,res)=>{
    const userExists = await User.findOne({
        "username" : req.params.username
    })
    console.log(req.params.username,userExists);
    res.send(userExists ? false : true)
    
})

router.post('/signup', async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    });
    await newUser.save();

    const token = jwt.sign({
        username : req.body.username
    },JWT_SECRET);
    
    res.send({
        "success" : true,
        "response" : `${req.body.username} registered successfully`,
        "token" : token
    })
});

router.post('/signin', async (req,res)=>{
    const userExists = await User.findOne({
        "username" : req.body.username
    })

    if(! userExists){
        return res.status(404).send("User doesn't exist, Kindly register and try again");
    }

    if(userExists.password != req.body.password){
        return res.status(403).send("Incorrect Password");
    }
    const token = jwt.sign({
        "username" : req.body.username
    },JWT_SECRET);
    
    res.send({
        "success" : true,
        "response" : `${req.body.username} logged in successfully`,
        "token" : token
    });    
});

module.exports = router;