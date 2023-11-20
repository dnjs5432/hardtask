const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const User = require("./user");

const Product = sequelize.define("product", {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Product.belongsTo(User, { foreignKey: "userId", as: "Id" });

module.exports = Product;
