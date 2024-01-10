import express from 'express';
import User from '../Entities/User.js';
import Manager from '../Entities/Manager.js';
import multer from 'multer';

const adminRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

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
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

adminRouter.post('/admin/addmanager', async (req, res) => {
    try {
        const newManager = await Manager.create(req.body);
        res.status(201).json(newManager);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

adminRouter.get('/admin/managers', async (req, res) => {
    try {
        const managers = await Manager.findAll();
        res.json(managers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { adminRouter };