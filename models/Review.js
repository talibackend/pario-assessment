const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");
const User = require("./User");

class Review extends Model {}

Review.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    posted_by : {
        type : DataTypes.INTEGER,
        references : {
            model : User,
            key : "id"
        }
    },
    address : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    landlord_conduct : {
        type : DataTypes.TEXT
    },
    environment : {
        type : DataTypes.TEXT
    },
    quality_of_amenities : {
        type : DataTypes.TEXT
    },
    others : {
        type : DataTypes.TEXT
    }
}, {sequelize : dbInstance});
module.exports = Review;