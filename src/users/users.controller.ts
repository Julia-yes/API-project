import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IUsersController } from './users.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'get',
			},
			{
				path: '/test',
				func: this.test,
				method: 'post',
			},
		]);
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'login error', 'login'));
	}

	test(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'test');
	}
}
