import { BaseModel } from '../common/models';

import { IUser } from '../interfaces';

export class User extends BaseModel implements IUser {
  static tableName = 'users';

  id!: number;
  firstName!: string;
  lastName!: string;
  dob!: string;
  mail!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default User;
