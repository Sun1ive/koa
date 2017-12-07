const koa = require('koa');
const koaBody = require('koa-body');
const app = new koa();

app.use(koaBody());

app.use(async ctx => {
  const body = ctx.request.body;

  if (!body.name) ctx.throw(400, 'Error there is nothing to do here!!');

  ctx.body = { name: body.name.toUpperCase() };
});

if (!module.parent) app.listen(8080);
