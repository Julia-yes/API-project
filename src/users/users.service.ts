import { injectable, inject } from 'inversify';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './repository.interface';
import { hash } from 'bcryptjs';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto) {
		const user = new User(name, email);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, salt);
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		} else {
			return this.usersRepository.create(user);
		}
	}

	async validateUser({ email, password }: UserLoginDto) {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.name, existedUser.email, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string) {
		const userData = await this.usersRepository.find(email);
		return userData;
	}
}
