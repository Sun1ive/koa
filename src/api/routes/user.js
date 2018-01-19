import Router from 'koa-router';
import * as UserControllers from '../controllers/user';

const router = new Router();

// user create
router.post('/user/create', UserControllers.createUser);

router.post('/user/login', UserControllers.login);

export default router;
