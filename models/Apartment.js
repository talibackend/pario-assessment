const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");

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
    }
}, {sequelize : dbInstance});
module.exports = Apartment;