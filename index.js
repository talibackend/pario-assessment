require('dotenv').config();
const dbInstance = require("./database/sequelize");
const UserModel = require("./models/User");
const TokenModel = require("./models/Token");
const ApartmentModel = require("./models/Apartment");
const apartments = require("./database/apartments");
const express = require("express");
const app = express();
const httpServer = require("http");


dbInstance.sync({force : true}).then(async ()=>{
    console.log("Database ready...");
    for(let i = 0; i < apartments.length; i++){
        await ApartmentModel.create({address : apartments[i].address, landlord : apartments[i].landlord});
    }
    console.log("Data has been seeded into db.");
    app.listen(process.env.PORT, ()=>{console.log(`Server running on :${process.env.PORT}`)});
    httpServer.createServer(app);
}).catch(err=>console.log(err))
