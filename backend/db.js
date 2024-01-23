const mongoose = require('mongoose')
require('dotenv').config();

const mongodb_connection_string = process.env.MONGODB_CONNECTIONSTRING
mongoose.connect(mongodb_connection_string);

const productSchema = new mongoose.Schema({
    "title" : String,
    "price" : Number,
    "image" : String,
    "reviews" : [{
        "user" : String,
        "review" : String
    }]
});

const Product = mongoose.model('Product',productSchema);

const channelSchema = new mongoose.Schema({
    "title" : String,
    "image" : String,
    "products" : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
});

const Channel = mongoose.model('Channel',channelSchema);

const userSchema = new mongoose.Schema({
    "username" : String,
    "password" : String,
    "e-mail" : String,
    "channels_joined" : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Channel'
        }
    ],
    "Orders Recieved" : [Object],
    "Order_History" : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Channel'
        },
        order_date : Date
    }],
    "channels_created" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Channel'
    }]
});

const User = mongoose.model('User',userSchema);

module.exports = { User, Product, Channel };