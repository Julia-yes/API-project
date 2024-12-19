import { NextFunction, Response, Request } from 'express';
import { IBaseController } from '../common/interfaces';

export interface IUsersController extends IBaseController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	test: (req: Request, res: Response, next: NextFunction) => void;
}
