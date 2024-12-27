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
import { IUserService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './repository.interface';
import { AuthGuardMiddleware } from '../common/auth.guard.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private UsersService: IUserService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				func: this.info,
				method: 'get',
				middlewares: [new AuthGuardMiddleware()],
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const isValidUser = await this.UsersService.validateUser(body);
		if (isValidUser) {
			const jwt = await this.signJWT(body.email);
			return this.ok(res, { jwt });
		} else {
			next(new HTTPError(401, 'login error', 'login'));
		}
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const user = await this.UsersService.createUser(body);
		if (!user) {
			return next(new HTTPError(422, 'Юзер существует'));
		}
		this.ok(res, { email: user.email, id: user.id });
	}

	async info({ user }: Request, res: Response, next: NextFunction) {
		const data = await this.UsersService.getUserInfo(user);
		if (data) {
			this.ok(res, { email: data.email, id: data.id });
		}
	}

	private signJWT(email: string): Promise<string> {
		const secret = this.configService.get('SECRET');
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
