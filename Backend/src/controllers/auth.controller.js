const userModel = require("../models/user.model");
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









module.exports = {userRegisterController};