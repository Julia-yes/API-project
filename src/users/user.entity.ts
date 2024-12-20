import { hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _name: string,
		private readonly _email: string,
	) {}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	get password() {
		return this._password;
	}

	async setPassword(pass: string) {
		this._password = await hash(pass, 10);
	}
}