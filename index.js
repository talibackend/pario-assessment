require('dotenv').config();
const dbInstance = require("./database/sequelize");
const UserModel = require("./models/User");
const TokenModel = require("./models/Token");
const ApartmentModel = require("./models/Apartment");

dbInstance.sync({force : true}).then(()=>{
    console.log("Database connected...");
}).catch(err=>console.log(err))


