import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager('./src/models/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

export default router;