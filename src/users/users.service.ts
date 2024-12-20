import { injectable, inject } from 'inversify';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto) {
		const user = new User(name, email);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, salt);
		return null;
	}
	validateUser({ email, password }: UserLoginDto) {
		return false;
	}
}
