import { boot } from '../src/index';
import { App } from '../src/app';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Re-registration of an existing user', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'test@test.com', password: '1', name: 'Test' });

		expect(res.statusCode).toBe(422);
	});

	it('Login registered user', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@test.com', password: '1' });

		expect(res.statusCode).toBe(200);
	});

	it('Login user with wrong password', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@test.com', password: '2' });

		expect(res.statusCode).toBe(401);
	});

	it('Info without jwt', async () => {
		const res = await request(application.app).get('/users/info');
		expect(res.statusCode).toBe(401);
	});

	it('Info without jwt', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@test.com', password: '1' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.statusCode).toBe(200);
	});
});

afterAll(() => {
	application.close();
});
