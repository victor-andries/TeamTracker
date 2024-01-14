import express from 'express';
import User from '../Entities/User.js';
import multer from 'multer';

const adminRouter = express.Router();
const upload = multer({ dest: '../src/uploads/' });

adminRouter.post('/admin/adduser', upload.single('profile_photo'), async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

adminRouter.get('/admin/users', async (req, res) => {
    try {
        const managers = await User.findAll( {
            where: { user_type: 'manager' }
        });
        const users = await User.findAll( {
            where: { user_type: 'user' }
        });

        res.json({ users: users, managers: managers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { adminRouter };