import { Response } from 'express';
import { User } from '../../modules/users/entity/user.entity';

export interface IRequestWithUser {
  user?: User;
  res?: Response;
}
