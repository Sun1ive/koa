import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_KEY = 'Secret';

export const createUser = async ctx => {
  try {
    const hash = await bcrypt.hash(ctx.request.body.password, 10);
    const user = await User.find({ emai: ctx.request.body.email });
    if (user.length >= 1) {
      return ctx.throw(409, 'Mail already used');
    }
    const USER = new User({
      _id: new mongoose.Types.ObjectId(),
      email: ctx.request.body.email,
      password: hash,
    });
    const result = await USER.save();
    ctx.body = {
      message: 'User Created!',
      user: result,
    };
  } catch (err) {
    ctx.body = err.errmsg;
  }
};

export const login = async ctx => {
  try {
    const user = await User.find({ email: ctx.request.body.email });
    if (user.length < 1) {
      return ctx.throw(401, 'Auth Failed');
    }
    const response = await bcrypt.compare(ctx.request.body.password, user[0].password)
    if (response) {
      const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id,
        },
        JWT_KEY,
        { expiresIn: '5h' },
      );
      ctx.body = {
        message: 'Auth successful',
        token,
      };
    }
  } catch (e) {
    ctx.body = e.errmsg;
  }
};
