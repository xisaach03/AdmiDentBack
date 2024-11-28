import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import { decrypt } from '../controllers/token.controller';

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
    const signedUser = req.cookies.user;
    if (signedUser) {
      console.log("antes del decrypt")
      decrypt(signedUser)

        //req.user = JSON.parse(signedUser);
        next();
    } else {
        res.sendStatus(HTTP_STATUS_CODES.AUTHORIZATION);
    }
}//desencriptar / desofuscar

export const logout = (req: Request, res: Response) => {
  res.clearCookie('user');
  res.status(HTTP_STATUS_CODES.SUCCESS).send('Logout exitoso');
}
