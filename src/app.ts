import { Server } from 'http';
import express, { Express } from 'express';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from './types/types';
import { IExceptionFilter } from './errors/exception.interface';
import { IUsersController } from './users/users.interface';
import { json } from 'body-parser';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private UsersController: IUsersController,
		@inject(TYPES.IExceptionFilter) private ExceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware() {
		this.app.use(json());
	}

	useRoutes() {
		this.app.use('/users', this.UsersController.router);
	}

	useExceptionFilter() {
		console.log('login errors');
		this.app.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
	}

	public init() {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}
}
