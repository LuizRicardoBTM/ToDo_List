import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction): void | Response {
    
    try {
        const token = req.headers.authorization?.split(' ')[1] as string;
        const secret = process.env.JWT_SECRET as string;
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, secret) as unknown as { userId: string };


        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        req.userId = decoded.userId;
        
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

}