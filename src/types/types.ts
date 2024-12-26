export const TYPES = {
	Application: Symbol.for('Application'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),
	ILogger: Symbol.for('ILogger'),
	IUsersController: Symbol.for('IUsersController'),
	IUsersService: Symbol.for('IUsersService'),
	IConfigService: Symbol.for('IConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	IUsersRepository: Symbol.for('IUsersRepository'),
};

export type TJWTData = {
	email: string;
	ait: number;
};
