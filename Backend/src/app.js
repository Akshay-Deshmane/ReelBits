const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route")
const app = express();



app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes); 
app.use("/api/food", foodRoutes);



module.exports = app;