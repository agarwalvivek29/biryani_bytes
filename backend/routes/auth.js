const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const router = Router();

router.post('/signup', async (req,res)=>{
    const newUser = new User(req.body);
    
    await newUser.save();
    res.send({
        "success" : true,
        "response" : `${req.body.username} registered successfully`
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
        
    res.send("User logged in successfully");    
})

module.exports = router;