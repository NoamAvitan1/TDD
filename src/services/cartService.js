const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');

class CartService {
    async addToCart(userId, productId, quantity) {
        let cart = await cartRepository.findCartByUserId(userId);

        if (!cart) {
            cart = await cartRepository.createCart(userId);
        }

        const product = await productRepository.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        cart.totalPrice = this.calculateTotalPrice(cart.items);
        return await cartRepository.saveCart(cart);
    }

    async removeFromCart(userId, productId) {
        const cart = await cartRepository.findCartByUserId(userId);

        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.totalPrice = this.calculateTotalPrice(cart.items);
        return await cartRepository.saveCart(cart);
    }

    async getCart(userId) {
        const cart = await cartRepository.findCartByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    calculateTotalPrice(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

module.exports = new CartService();
