require('dotenv').config();
const connectDB = require('./src/config/db');
const express = require('express');

//import routes
const productRoutes = require('./src/routes/productRoute')
const userRoutes = require('./src/routes/userRoute')
const cartRoutes = require('./src/routes/cartRoute')

//create an express app
const app = express();

// Use environment variables from .env
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

//routes
app.use("/product",productRoutes);
app.use("/user",userRoutes);
app.use("/cart",cartRoutes)

connectDB(MONGO_URI).then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to connect to the database:", error);
});