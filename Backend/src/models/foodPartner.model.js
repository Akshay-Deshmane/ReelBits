const mongoose = require("mongoose");


const foodPartnerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Partner name is required"]
    },
    contactName : {
        type : String,
        required : [true, "contact name is required"]
    },
    phone : {
        type : String,
        required : [true, "Phone number is required"]
    },
    address : {
        type : String,
        required : [true, "address is required"]
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