import { BaseModel } from '../common/models';

// import { IUser } from '../interfaces';

export class User extends BaseModel {
  static tableName = 'users';
}

export default User;
