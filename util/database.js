require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("task", "root", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});

//스키마 이름 , 유저(pwd) , 유저패스워드 , host , sql 종류

module.exports = sequelize;
