import Router from 'koa-router';
import * as MailControllers from '../controllers/mail';

const router = new Router();

// link
router.post('/mail/link', MailControllers.postLink);
// user data
router.post('/mail/user', MailControllers.postUser);

export default router;
