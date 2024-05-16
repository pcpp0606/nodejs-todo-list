// middlewares/checkProductId.js
import Product from '../schemas/products.schema.js';

const checkProductId = async (req, res, next) => {
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ message: '상품 ID가 필요합니다.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
};

export default checkProductId;
