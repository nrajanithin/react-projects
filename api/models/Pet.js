const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner_name : { type: String, required: true },
    pet_type : {type: String,required :true},
    pet_breed : {type: String,required :true},
    pet_location : {type: String,required :true},
    owner_details :{type: String,required :true},
    pet_name : {type: String,required :true},
    contact : {type: String,required :true},
    image: { type: String, required: true }
});

module.exports = mongoose.model('Pet', petSchema);