const Cart = require('../models/cartModel');

class CartRepository {
    async findCartByUserId(userId) {
        return await Cart.findOne({ userId }).populate('items.productId');
    }

    async createCart(userId) {
        const cart = new Cart({ userId, items: [] });
        return await cart.save();
    }

    async saveCart(cart) {
        return await cart.save();
    }
}

module.exports = new CartRepository();
