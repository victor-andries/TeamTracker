import express from 'express'
import Task from '../Entities/Task.js'
import User from '../Entities/User.js'

const taskRouter = express.Router();

taskRouter.post('/manager/addtask', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

taskRouter.get('/user/tasks', async (req, res) => {

    try {
        const loggedInUser = await User.findOne({
            where: { logged_in: true }
        });

        if (!loggedInUser) {
            return res.status(404).json({ error: "Niciun user logat gasit" })
        }

        const completedTasks = await Task.findAll({
            where: {
                user_id: loggedInUser.user_id,
                status: 'COMPLETED'
            }
        });

        const availableTasks = await Task.findAll({
            where: {
                user_id: loggedInUser.user_id,
                status: 'PENDING'
            }
        });

        res.json({
            completedTasks: completedTasks,
            availableTasks: availableTasks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

taskRouter.patch('/user/tasks/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.update({
            status: 'COMPLETED'
        }, {
            where: { task_id }
        });

        const updatedTask = await Task.findByPk(task_id);

        res.json({ message: 'Task modificat cu succes', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

taskRouter.patch('/tasks/closed/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.update({
            status: 'CLOSED'
        }, {
            where: { task_id }
        });

        const updatedTask = await Task.findByPk(task_id);

        res.json({ message: 'Task modificat cu succes', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

taskRouter.get('/tasks/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const tasks = await Task.findAll({ 
            where: { user_id: user_id }
        });
        if (!tasks) {
            return res.status(404).json({ message: 'Taskurile nu au fost găsite.' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: "Eroare la preluarea datelor"})
    }
});

taskRouter.get('/user/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        console.log(user_id);
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obținerea datelor utilizatorului.' });
    }
});

export { taskRouter };