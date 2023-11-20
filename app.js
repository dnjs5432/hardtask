require("dotenv").config();
const sequelize = require("./util/database");
const express = require("express");
const jwt = require("jsonwebtoken");
const UserRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(UserRouter);

sequelize.sync().then((result) => {
    console.log("연결이 잘 되었다.");
    app.listen(3000);
});
