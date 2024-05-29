const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
