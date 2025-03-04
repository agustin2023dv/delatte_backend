import { Request } from 'express';
import {IUser} from '@delatte/shared/interfaces';

declare global {
  namespace Express {
    interface Request {
      userId?: string; 
    }
  }
}

export interface AuthRequest extends Request {
  user?: typeof User;
}