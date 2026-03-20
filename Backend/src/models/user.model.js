const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "FullName is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true
    },
    password : {
        type : String
    }
}, {
    timestamps : true
})


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;