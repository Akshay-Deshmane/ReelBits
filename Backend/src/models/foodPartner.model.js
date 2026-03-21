const mongoose = require("mongoose");


const foodPartnerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Partner name is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }
})


const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);


module.exports = foodPartnerModel;