import { NextFunction, Response, Request, Router } from 'express';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
}

export interface IBaseController {
	router: Router;
	send: <T>(res: Response, code: number, message: T) => Response;
	ok: <T>(res: Response, message: T) => void;
}

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
