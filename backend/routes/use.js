const { Router } = require('express');
const { Channel, User, Product } = require('../db');
const mongoose = require('mongoose');
const router = Router();
const {authenticate} = require('../middlewares/auth');

router.get('/user',authenticate, async(req,res)=>{
    console.log('User details accessed',req.body.username);
    const user = await User.findOne({
        "username" : req.body.username
    });
    res.send(user);
})

router.get('/channel',async(req,res)=>{
    console.log('Channel details sent');
    const channels = await Channel.find();
    res.send(channels);
})

router.get('/product',async(req,res)=>{
    console.log('Product details sent');
    const products = await Product.find();
    res.send(products);
});

router.get('/discover',async (req,res)=>{
    const channels = await Channel.find();
    res.send(channels);
})

router.put('/:channelid', async(req,res)=>{
    const user = await User.findOne({
        "username" : req.body.username 
    })
    console.log(user);
    const channelid = req.params.channelid;
    
    if(user.user.channels.includes(channelid)){
        const index = user.user.channels.indexOf(channelid);
        user.user.channels.pop(index);
    }
    else{
        user.user.channels.push(channelid)
    }

    await user.save();
    res.send('Channel joined / left successfully')
})

router.get('/channels',async (req,res)=>{
    const user = User.findOne({
        "username" : req.headers.username
    })
    res.send(user.channels_joined);
})

router.get('/:channel/products',async (req,res)=>{
    const channel = await Channel.findOne({
        "title" : req.params.channel
    })
    if(! channel){
        return res.status(404).send("Channel doesn't exist");
    }
    const objectIdArray = channel.products;
    const objectIdInstances = objectIdArray.map(id => new mongoose.Types.ObjectId(id));
    const products = await Product.find({ _id: { $in: objectIdInstances } });
    res.send(products);
})

router.post('/addtocart/:productid',async(req,res)=>{
    try{
        const user = await User.findOne({
            "username" : req.body.username
        })
    
        user.cart.push(req.params.productid);
        user.save();
        console.log(`${req.params.productid} added to ${req.body.username}'s cart successfully`);
        res.send(user.cart);
    }
    catch(e){
        res.send({
            "error" : true,
            "err" : e
        })
    }
})

router.post('/removefromcart/:productid',async(req,res)=>{
    try{
        const user = await User.findOne({
            "username" : req.body.username
        })

        const index = user.cart.indexOf(req.params.productid)
        user.cart.splice(index,1);
        user.save();
        console.log(`${req.params.productid} removed from ${req.body.username}'s cart successfully`)
        res.send(user.cart);
    }
    catch(e){
        res.send({
            "error" : true,
            "err" : e
        })
    }
})

module.exports = router;