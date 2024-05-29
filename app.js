// app.js file for start the test
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoute');
const cartRoutes = require('./src/routes/cartRoute');
const userRoutes = require('./src/routes/userRoute');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = app;
