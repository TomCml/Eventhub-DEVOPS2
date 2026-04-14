import request from 'supertest';
import app from '../api/app';
import { prisma } from '../infrastructure/database/db';

describe('Integration Test: Auth API (Register & Login)', () => {

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /api/users/register', () => {
        let registeredUserId: string | null = null;

        const registerUser = {
            username: 'testregister',
            email: `register_${Date.now()}@example.com`,
            password: 'Password123!'
        };

        afterAll(async () => {
            if (registeredUserId) {
                await prisma.user.delete({ where: { id: registeredUserId } });
                registeredUserId = null;
            }
        });

        it('should successfully register a new user', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send(registerUser);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.user).toHaveProperty('email', registerUser.email);
            expect(response.body.data.user).toHaveProperty('username', registerUser.username);
            expect(response.body.data.user).toHaveProperty('id');

            registeredUserId = response.body.data.user.id;
        });
    });

    describe('POST /api/users/login', () => {
        let loginUserId: string | null = null;

        const loginUser = {
            username: 'testlogin',
            email: `login_${Date.now()}@example.com`,
            password: 'Password123!'
        };

        beforeAll(async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send(loginUser);

            if (res.body.data && res.body.data.user) {
                loginUserId = res.body.data.user.id;
            }
        });

        afterAll(async () => {
            if (loginUserId) {
                await prisma.user.delete({ where: { id: loginUserId } });
            }
        });

        it('should successfully login a valid user and return a token', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: loginUser.email,
                    password: loginUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.user).toHaveProperty('email', loginUser.email);
            expect(response.body.data.user).toHaveProperty('username', loginUser.username);
            expect(response.body.data.user).not.toHaveProperty('password');

            expect(response.headers['set-cookie']).toBeDefined();
            const cookies = (response.headers['set-cookie'] || []) as unknown as string[];
            expect(cookies.some(cookie => cookie.includes('token='))).toBe(true);
        });

        it('should fail with incorrect password', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: loginUser.email,
                    password: 'WrongPassword!!!'
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toHaveProperty('message', 'Invalid email or password');
        });

        it('should fail if email is not found', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: `nonexistent_${Date.now()}@example.com`,
                    password: 'password123'
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toHaveProperty('message', 'Invalid email or password');
        });
    });
});
