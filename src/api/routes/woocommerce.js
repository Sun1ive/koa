import Router from 'koa-router';
import WooControllers from '../controllers/woocommerce';

const router = new Router();

router.post('/woo', WooControllers);

export default router;
