import jwt from 'jsonwebtoken';

const JWT_KEY = 'Secret';

export default async (ctx, next) => {
  try {
    const token = ctx.header.authorization.split(' ')[1];
    ctx.state.user = await jwt.verify(token, JWT_KEY)
    next();
  } catch (error) {
    ctx.throw(403);
  }
};
