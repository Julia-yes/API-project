import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _name: string,
		private readonly _email: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	get password() {
		return this._password;
	}

	async setPassword(pass: string, salt: string) {
		this._password = await hash(pass, Number(salt));
	}

	async comparePassword(pass: string) {
		const result = await compare(pass, this._password);
		return result;
	}
}
