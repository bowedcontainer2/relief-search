var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
const router = express.Router();

var storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, Date.now() + "_" + file.originalname);
     }
 });

var upload = multer({
     storage: storage
 }).single('image');


 var options = {
     url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true',
     method: 'POST',
     headers: {
         'Ocp-Apim-Subscription-Key': '6db02891df294caa88b462af42da79be',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      	url: "http://localhost:3000/Images/image.png"
      })
 };


function processImage(){
  request(options, function(err, res, body) {
    if (err){
      console.log(err);
    }
    else{
      let json = JSON.parse(body);
      console.log(json);
    }
    });
};

router.post('/Upload', function(req, res) {
      //console.log(req);
      upload(req, res, function(err) {
          if (err) {
              return res.end("Something went wrong!");
          }
          processImage();
          return res.end("File uploaded sucessfully!.");
      });

  });



module.exports = router;
