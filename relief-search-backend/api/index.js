var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

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

router.post('/Upload', function(req, res) {
      upload(req, res, function(err) {
          if (err) {
              return res.end("Something went wrong!");
          }
          return res.end("File uploaded sucessfully!.");
      });
  });



module.exports = router;
