const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const User = sequelize.define("user", {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;
