require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

describe('Cart API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Cart.deleteMany({});
        await Product.deleteMany({});
    });

    test('should create a cart', async () => {
        // Create a product first
        const product = await Product.create({
            name: 'Test Product2',
            price: 10,
            description: 'Test Description2',
            stock: 100
        });
        const response = await request(app)
            .post('/cart/add')
            .send({
                userId: "665779afaea44d0c0e0341c7",
                productId: product._id.toString(),
                quantity: 2
            });
        console.log(response.status);
        expect(response.status).toBe(200);
    });
});
