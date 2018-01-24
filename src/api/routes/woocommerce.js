import Router from 'koa-router';
import * as WooControllers from '../controllers/woocommerce';

const router = new Router();

router.post('/woo', WooControllers.fetchItems);
router.get('/test', WooControllers.test)

export default router;
