const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

exports.isAuth = (req, res, next) => {
    const { authorization } = req.headers;

    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(400).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
    }

    try {
        const Id = jwt.verify(authToken, process.env.DB_KEY);

        res.locals.user = Id;
        next();
    } catch (err) {
        res.status(400).send({
            errorMessage: "로그인 후 이용 가능한 기능1입니다.",
        });
    }
};
