const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class UserService {
    async registerUser(userData) {
        const existingUser = await userRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        
        const user = await userRepository.createUser(userData);
        return user;
    }

    async loginUser(email, password) {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        user.password = "******";
        return user;
    }
}

module.exports = new UserService();
