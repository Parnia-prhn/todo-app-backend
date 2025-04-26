import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/schemas/user.schema';
const secretKey = process.env.JWT_SECRET_KEY;
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'your-secret-key') as {
        userId: string;
      };
      req.user = { userId: decoded.userId } as Partial<User>;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
