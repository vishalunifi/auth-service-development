import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRoutes from "./routes/userRoutes"
import knex from './db';

const app = new Koa();

app.use(bodyParser());
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
