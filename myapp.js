'use strict'
const express = require('express')
var bodyParser = require('body-parser')

const { response } = require('express')
const AWS=require('aws-sdk');
const KEY_ID= "ASIA2XWSATAKMQOJ5XXE"; 
const SECRET_KEY="kZTL43SqxhdeWJmy3vrxZYV0s/w9kc30iwl2czPQ";
const TOKEN="FwoGZXIvYXdzEAoaDJmTQvYcbWUuGs8D9CLAAb6ckzKSoYyc0oW19Bf4MeL6cdG3nVievuz3wzDNfx9HznccmFIEZ6YqiSvbDy6uWpFZjIAM3GAem9+YlBt2vzEl2HZzhx6AedUxL3ophcm1s3gKhOekxOv11cNq1fzja0f0M45dVsB/O7BAXuWCQiaxv6kSkQVC6aMQvjLaADTgykFua39oRIh4YUf1AuNuhVp6Th7/2c822dsfeONej/NQ9IjB9+oGAdeW9zdaUGHxwu77SKUST2dPzR6vb8vypyiK/oiRBjIte6JppHBcu64+lfRZ8LKDqnJD2R0kcuOp+7UMC0s/hT1Ii+YS4qmucLG1oVFN";
const s3= new AWS.S3({  
    accessKeyId:KEY_ID,
    secretAccessKey: SECRET_KEY,
    sessionToken:TOKEN,
    region:"us-east-1"
});




// Constants
const PORT = 80

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const uploadFile = (response) => {
   
       
    
  };

var url; 
app.post('/storedata', async (req, res) => {
  if (req.body.data == null) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([{ data: 'nil', error: 'Invalid JSON input.' }]))
    console.log(req.body)
  } else {
    console.log(req.body.data)
    var response = {
      data: req.body.data,
    }
    console.log(response)
    const params = {
        Bucket: 'b00884335', // pass your bucket name
        Key: 'data.json', // file will be saved as testBucket/contacts.csv
        Body: JSON.stringify(response)
    };
    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        url=`${data.Location}`
        console.log(`File uploaded successfully at ${data.Location}`)
    });

    console.log(response)
    //const finalResponse = await makePostRequest(response)
    res.status(200).send(url)
  }
})

app.listen(PORT)
console.log(`Running on ${PORT}`)