import Router from 'koa-router';
import { get, register, login, updateEmail, resetPassword, getUsers } from '../controllers/UserControllers';

const router = new Router({
  prefix: '/users'
});
router.get("/", get);
router.get("/getAll", getUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/email', updateEmail);
router.put('/reset-password', resetPassword);

export default router;