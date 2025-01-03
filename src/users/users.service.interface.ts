import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';

export interface IUserService {
	createUser: (data: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (data: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
