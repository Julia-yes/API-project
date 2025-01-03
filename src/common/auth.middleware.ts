import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './interfaces';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					return next();
				} else if (payload) {
					if (typeof payload !== 'string') {
						req.user = payload.email;
						return next();
					}
				}
			});
		} else {
			next();
		}
	}
}
