import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private UsersService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'get',
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'login error', 'login'));
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const user = await this.UsersService.createUser(body);
		if (!user) {
			return next(new HTTPError(422, 'Юзер существует'));
		}
		this.ok(res, user);
	}
}
