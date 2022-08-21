const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");
const Review = require("./Review");

class ReviewHelpful extends Model {}

ReviewHelpful.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    review_id : {
        type : DataTypes.INTEGER,
        references : {
            model : Review,
            key : "id"
        }
    },
    ip_address : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {sequelize : dbInstance});
module.exports = ReviewHelpful;