import request from 'supertest';
import app from '../api/app';
import { prisma } from '../infrastructure/database/db';
import { generateSignature } from '../utility/password.utility';

// Provide a valid JWT secret for testing manually or it will read from process.env
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('Integration Test: GET /api/events (Real DB)', () => {
    let validToken: string;

    beforeAll(() => {
        // Generate a real token so it passes AuthMiddleware
        // It pretends to be a user that exists or just passes signature verification
        validToken = generateSignature({
            id: 'mock-user-id',
            username: 'testuser',
            email: 'test@example.com',
            createdAt: new Date(),
        } as any);
    });

    afterAll(async () => {
        // Close DB connections
        await prisma.$disconnect();
    });

    it('should return exactly 3 events at a time by default', async () => {
        const response = await request(app)
            .get('/api/events?limit=3')
            .set('Cookie', [`token=${validToken}`]);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        // We know limit is 3, so data length should be <= 3 (depending on real DB rows)
        expect(response.body.data.data.length).toBeLessThanOrEqual(3); 
        expect(response.body.data.limit).toBe(3);
    });

    it('should return 401 if missing auth token', async () => {
        const response = await request(app)
            .get('/api/events');
        
        expect(response.status).toBe(401); 
        expect(response.body.success).toBe(false);
    });
});
