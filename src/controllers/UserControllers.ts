import { create } from './../dal/dal';
import { Context } from 'koa';
import * as testDAL from "../dal/dal";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from 'config';
import { registerSchema, loginSchema, updateEmailSchema, resetPasswordSchema } from '../utils/validators';
import User from '../models/User';
import { IRegisterRequest, ILoginRequest, IUpdateEmailRequest, IResetPasswordRequest, IUser } from '../interfaces';
const DB_CONFIG: Object = config.get('database');
const jwtSecret = config.get<string>('jwtSecret');
export const get = async(ctx:Context)=>{
  ctx.body = "get from Vishal";
};

export const getUsers = async (ctx: Context)=>{
  const Users = await testDAL.GetAll();
  ctx.body = Users;
}

export const register = async (ctx: Context) => {
  console.log(DB_CONFIG);
  const { firstName, lastName, dob, mail, password, confirmPassword } = ctx.request.body as IRegisterRequest;

  const { error } = registerSchema.validate({ firstName, lastName, dob, mail, password, confirmPassword });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await testDAL.create({
    "firstName": firstName,
    "lastName": lastName,
    "dob": dob,
    "mail": mail,
    "password": hashedPassword
  });

  ctx.status = 201;
  ctx.body = user;
};
type UserLogin= {
  id:number,
  password: string,
  mail: string
}
function hello(a:string){
  console.log("");
}

export const login = async (ctx: Context) => {
  const { mail, password } = ctx.request.body as ILoginRequest;

  const { error } = loginSchema.validate({ mail, password });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const user:any = await testDAL.getByMail(mail );
  if (!user || !(await bcrypt.compare(password, user.password))) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid email or password' };
    return;
  }

  const token = jwt.sign({ id: user.id, mail: user.mail }, jwtSecret);
  ctx.body = { token };
};



const authenticateUser = (ctx: Context) => {
  const token = ctx.headers.authorization?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Authentication token is missing' };
    return null;
  }

  try {
    return jwt.verify(token, jwtSecret) as { id: string; mail: string }; // Adjust the payload type as per your JWT structure
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid token' };
    return null;
  }
};

export const updateEmail = async (ctx: Context) => {
  const user = authenticateUser(ctx);
  if (!user) return;

  const { id } = user;
  const { mail } = ctx.request.body as IUpdateEmailRequest;

  const { error } = updateEmailSchema.validate({ mail });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  try {
    const updatedUser = await testDAL.update(id,{mail});
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "internal Server error" };
  }
};

export const resetPassword = async (ctx: Context) => {
  const user = authenticateUser(ctx);
  if (!user) return;

  const { id } = user;
  const { password, confirmPassword } = ctx.request.body as IResetPasswordRequest;

  const { error } = resetPasswordSchema.validate({ password, confirmPassword });
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await testDAL.update(id,{password: hashedPassword});
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
