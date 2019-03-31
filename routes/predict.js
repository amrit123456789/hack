// GET /app/settings         -> go the settings

const express = require('express');
const router = express.Router();
var request = require('request-promise');
const fs =require('fs')
const csv= require('csv-parser')


//var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');

router.get('/app/predict', (req, res) => {
    res.status(200).render('Predict', {pageTitle: "System settings"});
});
router.post('/app/predict',async function(req,res,next){
   console.log("in predict.js.....")
    console.log("sel1 is  ...",req.body.sel1)

    var data ={data:req.body.sel1}

    var options = {
        method: 'POST',
        uri: 'http://localhost:5000/api',
        body: data,
        json: true // Automatically stringifies the body to JSON
    };
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });

    var treatment="no treatment available right now"
    fs.createReadStream('/home/amrit/Documents/amrit/CBWEBD26-9-18/my-projects/hackn/routes/description.csv')
.pipe(csv())
.on('data', function(data){
    try {
     if(data.disease)
     	if(data.disease==returndata){
             treatment=data.treatment;
             console.log(treatment);
             res.status(200).render('predicted',{value: returndata,treat:treatment});
         }
             
    }
    catch(err) {
        //error handler
        if(err)
        	console.log('general disease is ')
    }
})
 
    
    
})
module.exports = router
