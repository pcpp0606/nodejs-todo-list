import express from 'express';
import asyncHandler from 'express-async-handler'; // asyncHandler 임포트
import Product from '../schemas/products.schema.js';
import checkProductId from '../middlewares/checkProductId.js'; // checkProductId 임포트

const router = express.Router();

// request: POST /products, 요청 본문에 상품명, 작성 내용, 작성자명, 비밀번호를 JSON 형식으로 전달
// response: 상품을 등록하고, '판매 상품을 등록하였습니다.' 메시지를 JSON 형식으로 반환
router.post(
    '/products',
    asyncHandler(async (req, res) => {
        const { title, content, author, password } = req.body;
        if (!title || !content || !author || !password) {
            return res.status(400).json({ message: INVALID_DATA });
        }
        await Product.create({ title, content, author, password });
        res.json({ message: '판매 상품을 등록하였습니다.' });
    }),
);

// request: GET /products
// response: 모든 상품의 목록을 JSON 형식으로 반환
router.get(
    '/products',
    asyncHandler(async (req, res) => {
        const products = await Product.find()
            .select('title author status createdAt')
            .sort({ createdAt: -1 });
        res.status(200).json({
            data: products,
        });
    }),
);

// request: GET /products/:id, 상품 ID를 URL 경로로 전달
// response: 특정 상품의 상세 정보를 JSON 형식으로 반환
router.get(
    '/products/:productId',
    checkProductId,
    asyncHandler(async (req, res) => {
        const product = await Product.findOne({
            _id: req.params.productId,
        }).select('title author content status createdAt');
        if (!product) {
            return res.status(404).json({
                message: '상품 조회에 실패하였습니다.',
            });
        }
        res.status(200).json({
            data: product,
        });
    }),
);

// request: PUT /products/:id, 상품 ID를 URL 경로로 전달, 수정하고 싶은 정보를 본문에 JSON 형식으로 전달
// response: 상품을 수정하고 '상품 정보를 수정하였습니다.' 메시지를 JSON 형식으로 반환
router.put(
    '/products/:productId',
    checkProductId,
    asyncHandler(async (req, res) => {
        const { title, content, password, status } = req.body;
        if (!title || !content || !password || !status) {
            return res.status(400).json({ message: INVALID_DATA });
        }
        const product = await Product.findOne({
            _id: req.params.productId,
        });
        if (!product) {
            return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
        }
        if (product.password !== Number(password)) {
            return res.status(401).json({
                message: '상품을 수정할 권한이 존재하지 않습니다.',
            });
        }
        await Product.updateOne(
            { _id: req.params.productId },
            { $set: { title, content, password, status } },
        );
        res.status(200).json({ message: '상품 정보가 성공적으로 수정되었습니다.' });
    }),
);

// request: DELETE /products/:id, 상품 ID를 URL 경로로 전달, 비밀번호를 본문에 JSON 형식으로 전달
// response: 상품을 삭제하고 '상품을 삭제하였습니다.' 메시지를 JSON 형식으로 반환
router.delete(
    '/products/:productId',
    checkProductId,
    asyncHandler(async (req, res) => {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: INVALID_DATA });
        }
        const product = await Product.findOne({
            _id: req.params.productId,
        });
        if (!product) {
            return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
        }
        if (product.password !== Number(password)) {
            return res.status(401).json({
                message: '상품을 삭제할 권한이 존재하지 않습니다.',
            });
        }
        await Product.deleteOne({ _id: product });
        res.status(200).json({ message: '상품을 삭제하였습니다.' });
    }),
);

export default router;
