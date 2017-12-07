const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('ms1 =', ms);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('ms2 =', ms);
});

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

if (!module.parent) app.listen(8080);
