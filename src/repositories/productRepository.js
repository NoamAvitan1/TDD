const Product = require('../models/productModel');

class ProductRepository {
    async create(product) {
        return Product.create(product);
    }

    async findById(id) {
        return Product.findById(id);
    }

    async findAll() {
        return Product.find();
    }

    async update(id, product) {
        return Product.findByIdAndUpdate(id ,product, { new: true });
    }

    async delete(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductRepository();