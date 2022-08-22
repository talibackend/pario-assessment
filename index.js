require('dotenv').config();
const dbInstance = require("./database/sequelize");
const UserModel = require("./models/User");
const TokenModel = require("./models/Token");
const ReviewModel = require("./models/Review");
const ReviewHelpfulModel = require("./models/ReviewHelpful");
const ReviewMediaModel = require("./models/ReviewMedia");
const express = require("express");
const app = express();
const httpServer = require("http");

const usersRoutes = require("./routes/user");
const reviewsRoutes = require("./routes/review");

UserModel.hasMany(TokenModel);
UserModel.hasMany(ReviewModel)
ReviewModel.hasMany(ReviewMediaModel);
ReviewModel.hasMany(ReviewHelpfulModel);

app.use(express.json());
app.use("/user", usersRoutes);
app.use("/review", reviewsRoutes);

app.get('/', (req, res)=>{res.send("<h1>Deployment successful!</h1>")});

dbInstance.sync({force : false}).then(async ()=>{
    console.log("Database ready...");
    app.listen(process.env.PORT, "0.0.0.0", ()=>{console.log(`Server running on :${process.env.PORT}`)});
    httpServer.createServer(app);
}).catch(err=>console.log(err))
