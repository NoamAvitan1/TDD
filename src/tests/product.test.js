require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

describe('Product API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    test('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({ name: 'Test Product3', price: 10, description: 'Test Description', stock: 5 });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Product3');
    });

    test('should get all products', async () => {
        await Product.create({ name: 'Test Product', price: 10, description: 'Test Description', stock: 5 });
        const response = await request(app).get('/products');

        expect(response.status).toBe(200);
    });
});
