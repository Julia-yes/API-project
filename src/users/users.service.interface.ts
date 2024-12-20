import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: (data: UserRegisterDto) => Promise<User | null>;
	validateUser: (data: UserLoginDto) => boolean;
}
