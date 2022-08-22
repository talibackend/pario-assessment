const {Model, DataTypes} = require("sequelize");
const dbInstance = require("../database/sequelize");
const Review = require("./Review");

class ReviewMedia extends Model {}

ReviewMedia.init({
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
    media_type : {
        type : DataTypes.ENUM('video', 'image')
    },
    media_url : {
        type : DataTypes.STRING
    }
}, {sequelize : dbInstance});
module.exports = ReviewMedia;