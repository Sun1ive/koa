const koa = require('koa');
const app = new koa();

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

if (!module.parent) app.listen(8080)
