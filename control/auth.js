const User = require("../model/user");
const jwt = require("jsonwebtoken");

//회원가입
exports.postsign = async (req, res) => {
    const { Email, Password, Name, Passwordcheck } = req.body;
    const isemail = await User.findOne({ where: { Email: Email } });
    const Emailcheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

    if (isemail) {
        return res.status(400).json({ errorMessage: "이메일이 이미 존재합니다." });
    }
    if (Password.length < 6) {
        return res.status(400).json({ errorMessage: "비밀번호가 6자리 이상이어야합니다." });
    }
    if (Passwordcheck !== Password) {
        return res.status(400).json({ errorMessage: "패스워드가 일치하지 않습니다." });
    }
    if (Emailcheck.test(Email) === false) {
        return res.status(400).json({ errorMessage: "이메일 형식이 올바르지 않습니다." });
    }
    await User.create({ Email, Password, Name });
    return res.status(200).json({ Email, Name });
};

//로그인
exports.postlogin = async (req, res) => {
    const { Email, Password } = req.body;
    const finduser = await User.findOne({ where: { Email: Email } });

    if (!finduser) {
        return res.status(400).json({ errorMessage: "이메일이 일치하지 않습니다." });
    }
    if (Password !== finduser.Password) {
        return res.status(400).json({ errorMessage: "패스워드가 일치하지 않습니다." });
    }

    const SECRET_KEY = process.env.DB_KEY;

    const accessToken = jwt.sign({ Id: finduser.userId }, SECRET_KEY, { expiresIn: "12h" });
    return res.status(200).json({ accessToken: "Bearer " + accessToken, message: "로그인 성공!" });
};

exports.okInfo = async (req, res) => {
    const { authorization } = req.headers;

    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") {
        res.status(400).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
    }

    try {
        const { Id } = jwt.verify(authToken, "wow");
        res.locals.user = Id;
        const myInfo = await User.findOne({ where: { userId: Id } });
        res.send({ Email: myInfo.Email, Name: myInfo.Name });
    } catch (err) {
        res.status(400).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }
};
