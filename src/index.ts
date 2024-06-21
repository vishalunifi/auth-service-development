// import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
// import userRoutes from "./routes/userRoutes"
// import knex from './db';

// const app = new Koa();

// app.use(bodyParser());
// app.use(userRoutes.routes());
// app.use(userRoutes.allowedMethods());

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import { loginRequired } from "./common/middleware";
import { startServer } from "./common/services";
import * as test from './controllers/UserControllers';


const internalApi: any = []
const externalApi: any = [
    { method: 'GET', path: '/users', handler: test.get},
    { method: 'GET', path: '/users/getAll',handler: test.getUsers},
    { method: 'POST', path: '/users/register', handler: test.register},
    { method: 'POST', path: '/users/login', handler: test.login},
    { method: 'PUT', path: '/users/email', handler: test.updateEmail, middleware: loginRequired()},
    { method: 'PUT', path: '/users/reset-password', handler: test.resetPassword, middleware: loginRequired()},

];

// router.get("/", get);
// router.get("/getAll", getUsers);
// router.post('/register', register);
// router.post('/login', login);
// router.put('/email', updateEmail);
// router.put('/reset-password', resetPassword);
// // / and :id - get
// export default router;

const [int, ext] = startServer(externalApi, internalApi);

