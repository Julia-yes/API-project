import { Server } from 'http';
import express, { Express } from 'express';
import { ILogger } from './logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from './types/types';
import { IExceptionFilter } from './errors/exception.interface';
import { IUsersController } from './users/users.interface';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private UsersController: IUsersController,
		@inject(TYPES.IExceptionFilter) private ExceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private PrismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware() {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes() {
		this.app.use('/users', this.UsersController.router);
	}

	useExceptionFilter() {
		this.app.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
	}

	public async init() {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.PrismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}

	public close() {
		this.server.close();
	}
}
