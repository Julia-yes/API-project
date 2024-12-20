import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject } from 'inversify';
import { TYPES } from '../types/types';
import { ILogger } from '../logger/logger.interface';

export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			logger.error('Ошибка .env файла');
		} else {
			logger.log('.env загружен ');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string) {
		return this.config[key] as string;
	}
}
