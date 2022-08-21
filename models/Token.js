const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");
const User = require("./User");

class Token extends Model{}

Token.init({
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.INTEGER,
        references : {
            model : User,
            key : "id"
        },
        allowNull : false
    },
    token : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    created_at : {
        type : DataTypes.TIME,
        allowNull : false
    },
    updated_at : {
        type : DataTypes.TIME,
        allowNull : false
    }
}, {sequelize : dbInstance});