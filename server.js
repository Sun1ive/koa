const koa = require('koa');
const logger = require('koa-logger');
// const compose = require('koa-compose');
// const koaAuth = require('koa-basic-auth');
// const koaBody = require('koa-body');

const app = new koa();

function testFunc(data) {
  return async function(ctx, next) {
    if (/(\.json)$/.test(ctx.path)) {
      console.log('test');
      await next();
    } else {
      await data.call(this, ctx, next);
    }
  };
}

app.use(testFunc(logger()));

app.use(async ctx => {
  ctx.body = 'Hello World!';
});

if (!module.parent) app.listen(8080);

/* app.use(koaBody());

app.use(async ctx => {
  const body = ctx.request.body;

  if (!body.name) ctx.throw(400, 'Error there is nothing to do here!!');

  ctx.body = { name: body.name.toUpperCase() };
});

app.use(async ctx => {
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>page not found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page not found',
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'page not found';
  }
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = `<h1>Error: ${ctx.status}</h1>`;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(async () => {
  throw new Error('Something bad happened');
});

app.on('error', err => {
  console.log(err.message);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authentificate', 'Basic');
      ctx.body = 'IDK what is going on';
    } else {
      throw error;
    }
  }
});

app.use(
  koaAuth({
    name: 'test',
    pass: 'test',
  }),
);

app.use(async ctx => {
  ctx.body = 'Secret';
});


async function nameOne(ctx, next) {
  await next();
  console.log('hello there 1');
}

async function nameTwo(ctx, next) {
  await next();
  console.log('hello there 2');
}

async function nameThree(ctx, next) {
  await next();
  console.log('hello there 3');
}

const all = compose([nameOne, nameTwo, nameThree]);

app.use(all);
 */
