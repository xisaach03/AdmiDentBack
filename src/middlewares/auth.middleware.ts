import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

declare global {
  namespace Express {
      interface IUser extends User {}
  }
}

// Opcionalmente redefine AuthenticatedRequest si lo usas:
declare module 'passport' {
  interface AuthenticatedRequest {
      user?: IUser;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Signed cookies: ', req.signedCookies)
    const signedUser = req.signedCookies.user;
    console.log('Signed cookie: ', signedUser);
    
    if (signedUser) {
        req.user = JSON.parse(signedUser);
        next();
    } else {
        res.sendStatus(HTTP_STATUS_CODES.AUTHORIZATION);
    }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('user');
  res.status(HTTP_STATUS_CODES.SUCCESS).send('Logout exitoso');
}
