import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
require('dotenv').config();
import fs  from 'fs;'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_api_key, 
    api_secret: process.env.CLOUDINARY_api_secret 
});

async function uploadCloud({localfilepath, objectId}){
    try{
        if(!localfilepath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localfilepath, {
            public_id : objectId,
            resource_type : Image
        })
        console.log(response)
        return response.url;
    }
    catch(error){
        console.error(error.stack);
        fs.unlinkSync(localfilepath);
        return null;
    }
}