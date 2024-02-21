const { Router } = require('express');
const { Channel, Product, User } = require('../db');
const mongoose = require('mongoose')
const router = Router();

router.post('/channel', async (req,res)=>{
    const user = await User.findOne({
        "username" : req.headers.username
    })
    if(! user){
        res.status(405).send("Invalid Request")
    }

    const newChannel = new Channel({
        "title" : req.body.title,
        "image" : req.body.image,
        "creator" : user._id
    })
    user.channels_created.push(newChannel._id);

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        await newChannel.save();
        await user.save();
    })
    session.endSession();

    console.log(user);
    res.send(`${req.body.title} : Channel created successfully`);
})

router.post('/:channel/product', async (req,res)=>{
    const newProduct = new Product(req.body);
    
    const foundchannel = await Channel.findOne({
        "title" : req.params.channel
    });
    
    if(! foundchannel){
        return res.status(404).send("Channel not found");
    }

    foundchannel.products.push(newProduct._id);

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        await newProduct.save();
        await foundchannel.save();    
    })
    session.endSession();
    res.send("Product added to channel successfully");    
})

router.get('/channels',async (req,res)=>{
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
});

module.exports = router;