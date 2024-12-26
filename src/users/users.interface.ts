import { NextFunction, Response, Request } from 'express';
import { IBaseController } from '../common/interfaces';
import { User } from './user.entity';

export interface IUsersController extends IBaseController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	info: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
