const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function userRegisterController(req, res) {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const isUserAlredayRegistered = await userModel.findOne({
        email
    })

    if(isUserAlredayRegistered) {
        return res.status(400).json({
           message : "User already exists in the system"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password : hashedPassword
    })

    const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    return res.status(201).json({
        message : "User Registered Successfully",
        user : {
            _id : user._id,
            fullName : user.fullName,
            email : user.email
        },
        token
    })

}



async function loginUser(req, res) {
    
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user) {
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message : "Invalid password"
        })
    }

    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(200).json({
        message : "User Login Successfully",
        user : {
            _id : user._id,
            fullName : user.fullName,
            email : user.email
        },
        token
    })


}



async function logoutUser(req, res) {

    res.clearCookie("token");
    
    return res.status(200).json({
        message : "User Logged Out Successfully"
    })
}



async function registerFoodPartner(req, res) {
 
    const { name, email, password } = req.body;

    const isAccountAlredayExists = await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlredayExists) {
        return res.status(400).json({
            message : "Food Partner Account Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword
    })

    const token = jwt.sign({
        id : foodPartner._id,
    }, process.env.JWT_SECRET,
    {
        expiresIn : "7d"
    })

    res.cookie("token", token);

    return res.status(201).json({
        message : "Food Partner Registered Successfully",
        user : {
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email,
        },
        token
    })
    
}



async function loginFoodPartner(req, res) {

    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner) {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id : foodPartner._id,
    }, process.env.JWT_SECRET,
    {
        expiresIn : "3d"
    })

    res.cookie("token", token);

    return res.status(200).json({
        message : "FoodPartner logged sucessfully",
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email
        },
        token
    })
}


async function logoutFoodPartner(req, res) {

    res.clearCookie("token");
    
    return res.status(200).json({
        message : "Food Partner Logged Out Successfully"
    })
}

module.exports = {userRegisterController, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner};