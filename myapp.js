'use strict'
const express = require('express')
var bodyParser = require('body-parser')

const AWS=require('aws-sdk');
const { json } = require('body-parser');
const KEY_ID= "ASIA2XWSATAKA2Z7LSFE"; 
const SECRET_KEY="JOL6OIc2VTEycABZsYF5NHpIqAdSsR2NC+jQAD15";
const TOKEN="FwoGZXIvYXdzEDAaDCnVOJoejc1lvKx/nyLAAROsTr8KIdto38IKznenHbGHdJzX4rYPMDrLw/fpRzzjG/fb2kEn/b+a+wrQJ57nCrNoAvzrleMg0iaaJePMaZ5oY8hfl41zpbiEb8CDIJYy/TLregCIS7S3BwwQlSj5it/wPSY3fWyVeCwNM7N7XM8QCZHfncdI2lqSklwzo63O5l5uZo5v/SxkrwO0p/tIUwamvUM7fvqT+Vchd34Fz9lvJWiDWNrHsNCXGWg1459wJ8YiV/zUq9wnADrx0F55fijospGRBjItK90z7IF4IcIZpd9GzuZtI4DLw9w6UumD1GaN3W4vcqQX4zUaI1tu7yF0y5J1";
const s3= new AWS.S3({  
    accessKeyId:KEY_ID,
    secretAccessKey: SECRET_KEY,
    sessionToken:TOKEN,
    region:"us-east-1"
});

const request = require('request');
  
const options = {
    url: 'http://3.88.132.229/begin',
    json: true,
    body: {
        "banner": "B00884335",
        "ip": "54.89.180.134"
     },
     
};
   
request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});

// Constants
const PORT = 80

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


var url; 
var validresponse={
    
}
app.post('/storedata', async (req, res) => {
  if (req.body.data == null) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([{ data: 'nil', error: 'Invalid JSON input.' }]))
  } else {
    
    const params = {
        Bucket: 'b00884335', 
        Key: 'data.json', 
        Body: req.body.data,
    };
    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        url= `${data.Location}`;
        validresponse={
            s3uri: url,
        } 
        console.log(params)
        res.status(200).json(validresponse)
    });
       
  }
})

app.listen(PORT)
console.log(`Running on ${PORT}`)