const { Router } = require('express');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const router = Router();

router.post('/',async (req,res)=>{
    const prompt = req.body.prompt;
    // console.log(process.env.SD_APIKEY);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //     "key": process.env.SD_APIKEY,
    //     "prompt": prompt,
    //     "negative_prompt": null,
    //     "width": "512",
    //     "height": "512",
    //     "samples": "1",
    //     "num_inference_steps": "20",
    //     "seed": null,
    //     "guidance_scale": 7.5,
    //     "safety_checker": "yes",
    //     "multi_lingual": "no",
    //     "panorama": "no",
    //     "self_attention": "no",
    //     "upscale": "no",
    //     "embeddings_model": null,
    //     "webhook": null,
    //     "track_id": null
    // });
    
    // try{
    //     const response = await axios.post("https://stablediffusionapi.com/api/v3/text2img",raw,{
    //         headers : myHeaders
    //     });
    //     //console.log(response);
    //     console.log(response.data);
    //     res.send(response.data);
    // }

    const response = await axios.post("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",{
        "inputs" : req.body.prompt
    },  
    {
        headers: {
            Authorization: `Bearer ${process.env.HF_APIKEY}`
        },
        responseType: 'arraybuffer'
    });
    
    if (response.status === 200) {
        const imageData = Buffer.from(response.data, 'binary');
        const filePath = `./image_generations/${prompt}.jpg`;

        fs.writeFileSync(filePath, imageData);
        res.send("Image saved successfully");
    }
    else{
        throw error
    }
});

module.exports = router;