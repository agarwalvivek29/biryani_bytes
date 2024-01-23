const { Router } = require('express');
const { Channel, Product, User } = require('../db');
const mongoose = require('mongoose')
const router = Router();

router.post('/channel', async (req,res)=>{
    const newChannel = new Channel({
        "title" : req.body.title,
        "image" : req.body.image
    })
    try{
        await newChannel.save();
        const user = await User.findOne({
            "username" : req.headers.username
        })
        console.log(user);
        if(user){
            user.channels_created.push(newChannel._id);
            await user.save();
        }
        res.send(`${req.body.title} : Channel created successfully`);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

router.post('/:channel/product', async (req,res)=>{
    const newProduct = new Product(req.body);
    try{
        await newProduct.save();
        const foundchannel = await Channel.findOne({
            "title" : req.params.channel
        });
        if(foundchannel){
            foundchannel.products.push(newProduct._id);
            await foundchannel.save();
            res.send("Product added to channel successfully");
        }
        else{
            res.status(404).send("Channel not found");
        }        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server error");
    }
})

router.get('/channels',async (req,res)=>{
    try{
        const user = await User.findOne({
            "username" : req.headers.username
        })
        if (!user) {
            return res.status(404).send("User not found");
        }
        const objectIdArray = user.channels_created
        const objectIdInstances = objectIdArray.map(id => new mongoose.Types.ObjectId(id));
        const channels = await Channel.find({ _id: { $in: objectIdInstances } });
        res.send(channels);
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal server Error");
    }
});

module.exports = router;