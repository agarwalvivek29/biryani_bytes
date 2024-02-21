const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

function authenticate(req,res,next){
    const token = req.headers.authorization;
    console.log('*',token,'*');
    const token1 = token.split(' ');
    const jwtToken = token1[1];
    console.log(jwtToken);

    try{
        const decodedvalue = jwt.verify(jwtToken,JWT_SECRET)
        console.log(decodedvalue);
        if(!decodedvalue){
            return res.status(403).send({
                success : false,
                auth : "Wrong auth token"
            })
        }
        req.body.username = decodedvalue.username;
        next();
    }
    catch(error){
        console.log(error);
        return res.send({
            error : true
        })
    }
}

module.exports = {authenticate};