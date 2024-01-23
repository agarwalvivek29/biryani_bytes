const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const router = Router();

router.post('/signup', async (req,res)=>{
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.send({
            "success" : true,
            "response" : `${req.body.username} registered successfully`
        })
    }
    catch(error){
        console.log(error);
        res.status(503).send("Internal Server Error");
    }
});

router.post('/signin', async (req,res)=>{
    try{
        const userExists = await User.findOne({
            "username" : req.body.username
        })
    
        if(userExists){
            if(userExists.password == req.body.password){
                res.send("User logged in successfully");
            }
            else{
                res.status(403).send("Incorrect Password");
            }
        }
        else{
            res.status(404).send("User doesn't exist, Kindly register and try again");
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;