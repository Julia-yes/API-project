import { ClassConstructor, plainToClass } from 'class-transformer';
import { IMiddleware } from './interfaces';
import { NextFunction, Response, Request, Router } from 'express';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute = ({ body }: Request, res: Response, next: NextFunction) => {
		const instance = plainToClass(this.classToValidate, body);
		console.log('testtesttewst');
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	};
}