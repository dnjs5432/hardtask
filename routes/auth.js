const express = require("express");
const User = require("../model/user");
const router = express.Router();
const authcontrol = require("../control/auth");
const Validation = require("../control/vali");
const Prod = require("../control/prod");

router.post("/signup", authcontrol.postsign);

router.post("/loginup", authcontrol.postlogin);

router.post("/user/me", authcontrol.okInfo);

router.post("/product", Validation.isAuth, Prod.productGo);

router.put("/product/:Id", Validation.isAuth, Prod.productModi);

router.delete("/product/:Id", Validation.isAuth, Prod.productDelete);

router.get("/product", Prod.productList);

router.get("/product/:Id", Prod.ProductDetail);
module.exports = router;
