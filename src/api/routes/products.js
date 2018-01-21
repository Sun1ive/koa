import Router from 'koa-router';
import * as ProductControllers from '../controllers/products';
import auth from '../../middleware/jwt';

const router = new Router();

// fetch all products with types
router.get('/products', ProductControllers.getAllItems);
// fetch products by types and by 4 per request
router.post('/products/items', ProductControllers.getItemsByChunks);
// fetch 1 product by link
router.post('/products/single', ProductControllers.findOneAndCompare);
// create product
router.post('/products/create', auth, ProductControllers.createProduct);
// edit product
router.patch('/products/:productId', auth, ProductControllers.editProduct);
// delete product
router.delete('/products/:productId', auth, ProductControllers.deleteProduct);

export default router;
