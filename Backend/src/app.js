const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route")
const foodPartnerRoutes = require("./routes/food-partner.routes")
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));



app.use("/api/auth", authRoutes); 
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


module.exports = app;