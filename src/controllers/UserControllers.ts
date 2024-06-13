import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from 'config';
import { registerSchema, loginSchema, updateEmailSchema, resetPasswordSchema } from '../utils/validators';
import User from '../models/User';
import { IRegisterRequest, ILoginRequest, IUpdateEmailRequest, IResetPasswordRequest } from '../interfaces';

const jwtSecret = config.get<string>('jwtSecret');

export const register = async (ctx: Context) => {
  const { firstName, lastName, dob, mail, password, confirmPassword } = ctx.request.body as IRegisterRequest;

  const { error } = registerSchema.validate({ firstName, lastName, dob, mail, password, confirmPassword });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message, "registration": "registration mein kuch gadbad hai brooooooooooo!" };
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.query().insert({
    firstName,
    lastName,
    dob,
    mail,
    password: hashedPassword
  });

  ctx.status = 201;
  ctx.body = user;
};

export const login = async (ctx: Context) => {
  const { mail, password } = ctx.request.body as ILoginRequest;

  const { error } = loginSchema.validate({ mail, password });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const user = await User.query().findOne({ mail });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid email or password' };
    return;
  }

  const token = jwt.sign({ id: user.id, mail: user.mail }, jwtSecret);
  ctx.body = { token };
};

export const updateEmail = async (ctx: Context) => {
  const { id } = ctx.state.user;
  const { mail } = ctx.request.body as IUpdateEmailRequest;

  const { error } = updateEmailSchema.validate({ mail });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const user = await User.query().patchAndFetchById(id, { mail });
  ctx.body = user;
};

export const resetPassword = async (ctx: Context) => {
  const { id } = ctx.state.user;
  const { password, confirmPassword } = ctx.request.body as IResetPasswordRequest;

  const { error } = resetPasswordSchema.validate({ password, confirmPassword });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.query().patchAndFetchById(id, { password: hashedPassword });
  ctx.body = user;
};
