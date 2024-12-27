import 'reflect-metadata';
import { Container } from 'inversify';
import { IUserService } from './users.service.interface';
import { IUsersRepository } from './repository.interface';
import { UserService } from './users.service';
import { TYPES } from '../types/types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { IConfigService } from '../config/config.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let usersService: IUserService;
let usersRepository: IUsersRepository;
let configService: IConfigService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUsersService).to(UserService);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);

	usersService = container.get<IUserService>(TYPES.IUsersService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	configService = container.get<IConfigService>(TYPES.IConfigService);
});

let newUser: UserModel | null;

describe('User Service', () => {
	it('Create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		newUser = await usersService.createUser({
			name: 'Jane',
			email: 'test@test.com',
			password: '111',
		});

		expect(newUser?.id).toEqual(1);
		expect(newUser?.password).not.toEqual(111);
	});

	it('Correct validation with correct password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(newUser);
		const result = await usersService.validateUser({ email: 'test@test.com', password: '111' });
		console.log('11', result);
		expect(result).toBeTruthy();
	});

	it('Validation error with uncorrect password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(newUser);
		const result = await usersService.validateUser({ email: 'test@test.com', password: '11' });
		expect(result).toBeFalsy();
	});

	it('Validation error with unregistered user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({ email: 'new@test.com', password: '111' });
		expect(result).toBeFalsy();
	});
});
