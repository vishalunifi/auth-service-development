import Router from 'koa-router';
import { register, login, updateEmail, resetPassword } from '../controllers/UserControllers';

const router = new Router({
  prefix: '/users'
});

router.post('/register', register);
router.post('/login', login);
router.put('/email', updateEmail);
router.put('/reset-password', resetPassword);

export default router;