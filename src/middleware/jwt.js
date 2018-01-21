import jwt from 'jsonwebtoken';

const JWT_KEY = 'Secret';

export default async (ctx, next) => {
  try {
    const token = await ctx.header.authorization.split(' ')[1];
    await jwt.verify(token, JWT_KEY);
    await next();
  } catch (error) {
    ctx.throw(403, error)
  }
};
