import Koa from 'koa';
import koaBody from 'koa-body';
import KoaRouter from 'koa-router';
import koaMorgan from 'koa-morgan';
import koaCors from '@koa/cors';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import path from 'path';
import mongoose from 'mongoose';

import wooRoutes from './api/routes/woocommerce';
import mailRoutes from './api/routes/mail';
import productRoutes from './api/routes/products';
import userRoutes from './api/routes/user';

const port = process.env.PORT || 8081;
const app = new Koa();
const router = new KoaRouter();

const MONGO_ATLAS_PW = 'indresser';
mongoose.connect(
  `mongodb://indresser:${MONGO_ATLAS_PW}@indresser-shard-00-00-phofm.mongodb.net:27017,indresser-shard-00-01-phofm.mongodb.net:27017,indresser-shard-00-02-phofm.mongodb.net:27017/test?ssl=true&replicaSet=indresser-shard-0&authSource=admin`,
);
mongoose.Promise = global.Promise;

app.use(koaBody());
app.use(koaMorgan('combined'));
app.use(koaCors());
app.use(koaStatic('public'));

// app.use(koaViews(path.join(__dirname, '/views'), { extension: 'pug' }));
app.use(koaViews(path.join(__dirname, 'views')));

app.use(router.allowedMethods());
app.use(wooRoutes.routes());
app.use(mailRoutes.routes());
app.use(productRoutes.routes());
app.use(userRoutes.routes());

/* eslint-disable no-console */
app.listen(port, () => console.log('Server is running at port ', port));
