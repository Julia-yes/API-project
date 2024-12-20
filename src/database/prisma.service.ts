import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect() {
		try {
			await this.client.$connect();
			this.logger.log('Подключено к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('Ошибка подключения к базе данных');
			}
		}
	}

	async disconnect() {
		await this.client.$disconnect();
	}
}
