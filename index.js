require('dotenv').config();
const dbInstance = require("./database/sequelize");
const UserModel = require("./models/User");
const TokenModel = require("./models/Token");
const express = require("express");
const app = express();
const httpServer = require("http");

const usersRoutes = require("./routes/user");
const reviewsRoutes = require("./routes/review");

UserModel.hasMany(TokenModel);

app.use(express.json());
app.use("/user", usersRoutes);
app.use("/review", reviewsRoutes);

dbInstance.sync({force : true}).then(async ()=>{
    console.log("Database ready...");
    app.listen(process.env.PORT, ()=>{console.log(`Server running on :${process.env.PORT}`)});
    httpServer.createServer(app);
}).catch(err=>console.log(err))
