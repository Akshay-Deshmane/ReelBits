const mongoose = require("mongoose");


function connectDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("server is connected to DB")
    })
    .catch((error) => {
        console.log("server is not connected to DB")
    })

}


module.exports = connectDB;