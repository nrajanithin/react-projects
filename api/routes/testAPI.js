var express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
var router = express.Router();
var uuidv4 = require('uuid/v4');
let Pet = require("../models/Pet");
const DIR = './public/';
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
   cb(null, DIR);
   },
   filename: (req, file, cb) => {
   const fileName = file.originalname.toLowerCase().split(' ').join('-');
   cb(null, uuidv4() + '-' + fileName)
   }
   });
    
   var upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
   cb(null, true);
   } else {
   cb(null, false);
   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
   }
   }
   });
router.get("/",(req,res,next)=>
{
   res.send("it's working perfect");
});
router.delete('/data/:id',(req,res,next)=>
{
  Pet.remove({_id : req.params.id },(err,result)=>
  {
    if(err)
    {
        res.json(err);
    }
    else{
       res.json({msg : "ok"})
    }
  })
})
router.get("/data", (req, res, next) => {
   Pet.find()
     .select("_id owner_name pet_type pet_breed pet_location owner_details pet_name contact image")
     .exec()
     .then(docs => {
       const response = {
         count: docs.length,
         pets: docs.map(doc => {
           return {
             owner_name: doc.owner_name,
             pet_type: doc.pet_type,
             pet_breed: doc.pet_breed,
             pet_location : doc.pet_location,
             owner_details : doc.owner_details,
             pet_name : doc.pet_name,
             contact : doc.contact,
             image : doc.image,
             _id: doc._id,
             request: {
               type: "GET",
               url: "http://localhost:3000/products/" + doc._id
             }
           };
         })
       };
       //   if (docs.length >= 0) {
       res.status(200).json(response);
       //   } else {
       //       res.status(404).json({
       //           message: 'No entries found'
       //       });
       //   }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({
         error: err
       });
     });
 });
router.post("/data",upload.single('image'),(req,res,next)=>
{
   const url = req.protocol + '://' + req.get('host');
   //res.send("ok mama");
   const pet = new Pet({
      _id: new mongoose.Types.ObjectId(),
      owner_name: req.body.owner_name,
      pet_type: req.body.pet_type,
      pet_breed : req.body.pet_breed,
      pet_location : req.body.pet_location,
      owner_details : req.body.owner_details,
      pet_name : req.body.pet_name,
      contact : req.body.contact,
      image: url + '/public/' + req.file.filename
    });
    pet.save()
    .then(result =>{
       console.log(result);
       res.status(201).json({msg:"succesfully submitted"})
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({error : err})
    })
});
module.exports = router;