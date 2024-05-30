require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User= require('../models/userModel');

describe('User API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('should login a user', async () => {
        await request(app)
            .post('/user/register')
            .send({ name: 'Noam', email: 'noam@example.com', password: 'password123' });

        const response = await request(app)
            .post('/user/login')
            .send({ email: 'noam@example.com', password: 'password123' });
        expect(response.status).toBe(200);
    });
});
