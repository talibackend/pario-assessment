const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");

class User extends Model{}

User.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    full_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    created_at : {
        type : DataTypes.TIME,
        allowNull : false
    }
}, {sequelize : dbInstance});

module.exports = User;