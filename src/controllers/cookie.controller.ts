import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user';

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
}


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const signedUser = req.signedCookies.user;
    console.log('Signed cookie: ', signedUser);
    
    if (signedUser) {
        req.user = JSON.parse(signedUser);
        next();
    } else {
        res.sendStatus(401);
    }
}

export default authMiddleware;