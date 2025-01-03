import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './interfaces';

export class AuthGuardMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction) {
		if (req.user) {
			return next();
		}
		res.status(401).send('Вы не авторизованы');
	}
}
