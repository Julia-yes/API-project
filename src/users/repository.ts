import { inject, injectable } from 'inversify';
import { User } from './user.entity';
import { TYPES } from '../types/types';
import { PrismaService } from '../database/prisma.service';
import { IUsersRepository } from './repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User) {
		return this.prismaService.client.userModel.create({ data: { email, password, name } });
	}

	async find(email: string) {
		return await this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
