import { IUser } from 'src/app/models/user';

export interface IAuthUser extends IUser {
  token: string;
}
