const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Створення завдання
router.post('/tasks', auth, async (req, res) => {
    try {
        const { task, dueDate } = req.body;
        const newTask = new Task({
            userId: req.user._id,
            task,
            dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// Отримання всіх завдань користувача
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get tasks' });
    }
});

module.exports = router;