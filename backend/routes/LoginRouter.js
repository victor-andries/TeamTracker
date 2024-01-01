import express from 'express';
import User from '../Entities/User.js';

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email,
                password,
            },
        });

        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if(user.user_type === 'admin') {
            return res.status(200).json({ userType: 'admin', message: 'Admin login successful' });
        } else if (user.user_type === 'manager') {
            return res.status(200).json({ userType: 'manager', message: 'Manager login successful' });
        } else {
            return res.status(200).json({ userType: 'user', message: 'User login successful' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export { loginRouter };