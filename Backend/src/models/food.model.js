const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Food name should be required"]
    },
    video : {
        type : String,
        required : [true, "Food video is required"]
    },
    description : {
        type : String,
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodpartner"
    }
})


const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;