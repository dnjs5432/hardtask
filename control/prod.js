const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Product = require("../model/product");
//상품등록
exports.productGo = async (req, res) => {
    try {
        const { Title, Content } = req.body;
        const Status = "FOR_SAIL";
        const userId = res.locals.user.Id;
        if (!Title || !Content) {
            return res.status(400).json({ errorMessage: "값이 유효하지 않습니다." });
        }
        await Product.create({ Title, Content, Status, userId });
        return res.json({ message: "상품 등록에 성공했습니다." });
    } catch (error) {
        return res.status(400).json({ errorMessage: "상품 등록에 실패했습니다." });
    }
};

//상품수정
exports.productModi = async (req, res) => {
    const { Id } = req.params;
    const { Title, Content, Status } = req.body;
    try {
        const validStatus = ["FOR_SALE", "SOLD_OUT"];
        if (!validStatus.includes(Status)) {
            return res.status(400).json({ errorMessage: "유효하지 않은 상태 값입니다." });
        }
        const userId = res.locals.user.Id;
        const product = await Product.findOne({ where: { productId: Id, userId } });
        if (!product) {
            return res.status(400).json({ errorMessage: "상품을 찾을 수 없습니다." });
        }
        product.Title = Title;
        product.Content = Content;
        product.Status = Status;

        await product.save();

        return res.json(product);
    } catch (error) {
        return res.status(400).json({ errorMessage: "상품 조회에 실패했습니다." });
    }
};

//상품삭제
exports.productDelete = async (req, res) => {
    const { Id } = req.params;
    try {
        const userId = res.locals.user.Id;
        const product = await Product.findOne({ where: { productId: Id, userId } });
        if (!product) {
            return res.status(400).json({ errorMessage: "상품을 찾을 수 없습니다." });
        }

        await product.destroy();

        return res.json({ message: "상품이 삭제되었습니다." });
    } catch (error) {
        return res.status(400).json({ errorMessage: "상품 삭제에 실패했습니다." });
    }
};

// 상품 목록 조회 작성자명
exports.productList = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: User,
                    attributes: ["Name"],
                    as: "Id",
                },
            ],
            attributes: ["productId", "Title", "Content", "Status", "createdAt"],
        });

        if (!products || products.length === 0) {
            return res.status(400).json({ errorMessage: "상품을 찾을 수 없습니다." });
        }

        return res.json(products);
    } catch (error) {
        return res.status(400).json({ errorMessage: "상품 조회에 실패했습니다." });
    }
};

// 상세 조회
exports.ProductDetail = async (req, res) => {
    const { Id } = req.params;

    try {
        const productDetails = await Product.findOne({
            where: { productId: Id },

            attributes: ["productId", "Title", "Content", "Status", "createdAt"],
            include: [
                {
                    model: User,
                    attributes: ["Name"],
                    as: "Id",
                },
            ],
        });

        if (!productDetails) {
            return res.status(400).json({ errorMessage: "상품을 찾을 수 없습니다." });
        }

        return res.json(productDetails);
    } catch (error) {
        return res.status(400).json({ errorMessage: "상품 조회 중 오류가 발생했습니다." });
    }
};
