import { IUser } from 'src/app/models/user.model';

export interface IAuthUser extends IUser {
  token: string;
}
