'use strict'
const express = require('express')
var bodyParser = require('body-parser')

const AWS=require('aws-sdk');
const { json } = require('body-parser');
const KEY_ID= "ASIA2XWSATAKFMYKLDXS"; 
const SECRET_KEY="4vsnoC8OZ9WJH+wk4aDjCXIbslNeir3JNFRqCSVn";
const TOKEN="FwoGZXIvYXdzEA4aDPsixpfUAzatXvZQXiLAAXP6zwSjee4ey4uQrswX0HQ3VdsVDbckRBU99JYDzfc4d5XUnLUcIVCnwqblGfcr5RRVMjBXrzCAK2zA0nXdmBgLUKRSTy6GciNdciYfniUjjXzwqx79y2w1TwGPVvVPjgCDzxz7VFRAl4WL1QzZAwU7+/rLCYbp86G8q/ra02BM+CzKi7wW16aMAWIv2yn8XkkpPwvsLvv6yAVAvXwGbusaWJdnvlGbTavfGEwThjpeeWr3WN/Y5Z4KR80BOqaFfijU8YmRBjIt95Znzn+HKlz3Z+cLypeBCS7Abg3qV2GzdE/t7Zci41d2S3KUilST83xkRUye";
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