var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
const router = express.Router();
var name = '';
var uri = '';
var obj = {};
var data = {
  faces: []
};
var storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         name = Date.now() + "_" + file.originalname;
         callback(null, name );
     }
 });

var upload = multer({
     storage: storage
 }).single('image');

function processFile(face){
  fs.readFile('data.json', 'utf8', function readFileCallback(err, res){
    if (err){
        console.log(err);
    } else {
    data = JSON.parse(res); //now it an object
    data.faces.push(face); //add some data
    json = JSON.stringify(data); //convert it back to json
    fs.writeFile('data.json', json, 'utf8', function writeFileCallback(err,res){
      if (err){
          console.log(err);
      }
    }); // write it back
  }});
}

function processImage(){
  obj["url"] = "http://35.185.245.7/Images/" + name;
  console.log(obj["url"])
  var options = {
      url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true',
      method: 'POST',
      headers: {
          'Ocp-Apim-Subscription-Key': '6db02891df294caa88b462af42da79be',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
  };
  request(options, function(err, res, body) {
    if (err){
      console.log(err);
    }
    else{
      var json = JSON.parse(body);
      //console.log(json[0]);
      var face = json[0];
      processFile(face);
    }
  });
};

router.post('/Upload', function(req, res) {
      upload(req, res, function(err) {
          if (err) {
              return res.end("Something went wrong!");
          }
          processImage();
          return res.end("File uploaded sucessfully!.");
      });

  });



module.exports = router;
