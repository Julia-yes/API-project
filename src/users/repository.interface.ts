import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (password: string) => Promise<UserModel | null>;
}
