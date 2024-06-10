import express from 'express';
import * as dotenv from 'dotenv';

import fetch from 'node-fetch';
import FileReader from 'FileReader';
import axios from 'axios';

let imgLink;


dotenv.config();

const router = express.Router();



router.route('/').get((req,res) => {
    res.send("hello from dalle")
});

router.route('/').post( async (req,res) => {
  
    try {
        const prompt =  req.body.prompt

        
         
        const fetchImg = async () => {
            try {
                
                const result = await axios.get(`https://api.unsplash.com/search/photos?query=${prompt}&page=4&per_page=20&client_id=${process.env.API_KEY}`);
                
                imgLink = result.data.results[0].urls.regular;
                
                 res.status(200).json({photo: imgLink});
            } catch (error) {
                 console.log(error);
            }
        }

        fetchImg();
        
       

            
              

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }

})

export default router; 
