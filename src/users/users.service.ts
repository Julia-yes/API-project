import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto) {
		const user = new User(name, email);
		await user.setPassword(password);
		return null;
	}
	validateUser({ email, password }: UserLoginDto) {
		return false;
	}
}
