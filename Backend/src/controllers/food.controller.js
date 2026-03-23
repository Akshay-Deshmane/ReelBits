const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");


async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer);

    const foodItem = await foodModel.create({
        name : req.body.name,
        description : req.body.description,
        video : fileUploadResult.url,
        foodPartner : req.foodPartner._id
    })

    res.status(201).json({
        message : "food created successfully",
        food : foodItem
    })
}


async function getFoodItems(req, res) {

    const foodItems = await foodModel.find({});

    return res.status(200).json({
        message : "Food Items fetched Successfully", 
        foodItems
    })
}

module.exports = {createFood, getFoodItems};