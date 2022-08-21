const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");
const User = require("./User");

class Apartment extends Model {}

Apartment.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    address : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    landlord : {
        type : DataTypes.STRING,
        allowNull : true
    },
    posted_by : {
        type : DataTypes.INTEGER,
        references : {
            model : User,
            key : "id"
        }
    }
}, {sequelize : dbInstance});
module.exports = Apartment;