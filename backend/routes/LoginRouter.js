import express from 'express';
import User from '../Entities/User.js';

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
                password,
            },
        });

        if(!user) {
            return res.status(401).json({ message: 'Date de identificare incorecte' });
        }
        
        if(user.user_type === 'admin') {
            await user.update({ logged_in: true });
            return res.status(200).json(user);
        } else if (user.user_type === 'manager') {
            await user.update({ logged_in: true });
            return res.status(200).json(user);
        } else {
            await user.update({ logged_in: true });
            return res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Eroare l-a server' });
    }
});

loginRouter.post('/logout', async (req, res) => {
    try {
        const { user_id } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
        }
        
        await user.update({ logged_in: false });

        res.json({ message: 'Delogare reușită.', user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { loginRouter };