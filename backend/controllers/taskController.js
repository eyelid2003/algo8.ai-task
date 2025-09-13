const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const createTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status } = req.body;
    
    const task = new Task({
        title,
        description,
        status: status || 'pending',
        user: req.user.id 
    });

    await task.save();
    res.status(201).json({ success: true, task });
});


const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
});

const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, user: req.user.id, isDeleted: false },
        { title, description, status },
        { new: true, runValidators: true } 
    );

    if (!updatedTask) {
        return res.status(404).json({ success: false, error: "Task not found or you are not authorized" });
    }

    res.status(200).json({ success: true, task: updatedTask });
});

const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: req.user.id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ success: false, error: "Task not found or you are not authorized" });
    }
    
    res.status(200).json({ success: true, msg: "Task deleted successfully" });
});

const searchTasks = asyncHandler(async (req, res) => {
    const { q } = req.query;

    const query = { user: req.user.id, isDeleted: false };

    if (q) {
        query.$or = [
            { title: { $regex: q, $options: 'i' } },
            { status: { $regex: q, $options: 'i' } }
        ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
});

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    searchTasks
};