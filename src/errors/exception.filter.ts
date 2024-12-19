import { NextFunction, Response, Request } from 'express';
import { HTTPError } from './http-error.class';
import { IExceptionFilter } from './exception.interface';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`Ошибка в ${err.context}: ${err.statusCode}, ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`неизвестная ошибка, ${err.message}`);
			res.status(500).send(err.message);
		}
	}
}
