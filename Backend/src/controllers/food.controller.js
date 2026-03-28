const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");


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


async function likeFoodController(req, res) {
    
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user : user._id,
        food : foodId
    })

    if(isAlreadyLiked) {
        await likeModel.deleteOne({
            user : user._id,
            food : foodId
        })
        
        await foodModel.findByIdAndUpdate(foodId, {
            $inc : {likeCount : -1}
        })

        return res.status(200).json({
            message : "Food unLiked Successfully"
        })
    }

    const like = await likeModel.create({
        user : user._id,
        food : foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc : {likeCount : 1}
    })

    return res.status(201).json({
        message : "Food Liked Successfully",
        like
    })

}


async function saveFood(req, res) {
 
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user : user._id,
        food : foodId,
    })

    if(isAlreadySaved) {
        await saveModel.deleteOne({
            user : user._id,
            food : foodId
        })
        
        await foodModel.findByIdAndUpdate(foodId, {
            $inc : {savesCount : -1}
        })

        return res.status(200).json({
            message : "Food Unsaved Successfully"
        })
    }

    const save = await saveModel.create({
        user : user._id,
        food : foodId
    })
    
    await foodModel.findByIdAndUpdate(foodId, {
        $inc : {savesCount : 1}
    })

    return res.status(201).json({
        message : "Food Saved Successfully",
        save
    })
}

  

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({
        user : user._id
    }.populate("food"));

    if(!savedFoods || savedFoods.length == 0) {
        return res.satuts(404).json({
           message : "No Saved Foods Found"
        })
    }
    
    return res.status(200).json({
        message : "Saved Foods Retrived Successfully",
        savedFoods
    })
}


module.exports = {createFood, getFoodItems, likeFoodController, saveFood, getSaveFood};