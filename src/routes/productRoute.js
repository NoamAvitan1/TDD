const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

//create product route
router.post('/', productController.createProduct);

//get single product by id
router.get('/:id', productController.getProductById);

//get all products
router.get('/', productController.getAllProducts);

//update single product
router.put('/:id', productController.updateProduct);

//delete single product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
