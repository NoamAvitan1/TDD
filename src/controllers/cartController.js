const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await cartService.addToCart(userId, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await cartService.removeFromCart(userId, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await cartService.getCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
