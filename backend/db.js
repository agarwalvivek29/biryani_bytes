const mongoose = require('mongoose')
require('dotenv').config();

const mongodb_connection_string = process.env.MONGODB_CONNECTIONSTRING
mongoose.connect(mongodb_connection_string);

const productSchema = new mongoose.Schema({
    "title" : String,
    "price" : Number,
    "image" : String,
    "description" : String,
    "reviews" : [{
        "username" : String,
        "review" : String
    }],
    "likes" : {
        type : Number,
        default : 0
    },
    "channel" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Channel'
    }
});

const channelSchema = new mongoose.Schema({
    "title" : String,
    "image" : String,
    "description" : String,
    "products" : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    "creator" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    "subscribers" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : 0
    }]
});

const userSchema = new mongoose.Schema({
    "username" : {
        type : String,
        unique : true
    },
    "password" : String,
    "email" : String,
    "phone" : String,
    "image" : {
        type : String,
        default : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Noun_Robot_1749584.svg/640px-Noun_Robot_1749584.svg.png"
    },
    "user" : {
        "channels" : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Channel'
        }],
        "orders" : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Order'
        }],
        "saved" : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }]
    },
    "creator" : {
        "channels" : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Channel'
        }],
        "orders" : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Order'
        }]
    },
    "cart" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }]
});

const orderSchema = new mongoose.Schema({
    "date" : Date,
    "product" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    "buyer" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    "seller" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

const Channel = mongoose.model('Channel',channelSchema);
const Product = mongoose.model('Product',productSchema);
const User = mongoose.model('User',userSchema);
const Order = mongoose.model('Order',orderSchema);

module.exports = { User, Product, Channel, Order };