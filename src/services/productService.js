const productRepository = require('../repositories/productRepository');

class ProductService {
    async createProduct(product) {
        return productRepository.create(product);
    }

    async getProductById(id) {
        return productRepository.findById(id);
    }

    async getAllProducts() {
        return productRepository.findAll();
    }

    async updateProduct(id, product) {
        return productRepository.update(id, product);
    }

    async deleteProduct(id) {
        return productRepository.delete(id);
    }
}

module.exports = new ProductService();
