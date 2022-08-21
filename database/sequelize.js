const Sequelize = require("sequelize");

module.exports = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, {dialect : "postgres", database : process.env.DB_NAME});

