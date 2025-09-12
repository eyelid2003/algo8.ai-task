const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Task = require('../models/Task');

// CREATE TASK
const createTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status } = req.body;
    
    // The auth middleware already ensures req.user.id is valid and exists.
    // The schema validation also handles ObjectId casting.
    
    const task = new Task({
        title,
        description,
        status: status || 'pending',
        user: req.user.id // Direct assignment; Mongoose handles the casting.
    });

    await task.save();
    res.status(201).json({ success: true, task });
});

// GET ALL TASKS OF LOGGED-IN USER
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
});

// UPDATE TASK
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, user: req.user.id, isDeleted: false },
        { title, description, status },
        { new: true, runValidators: true } // 'new: true' returns the updated doc; 'runValidators' ensures schema validation.
    );

    if (!updatedTask) {
        return res.status(404).json({ success: false, error: "Task not found or you are not authorized" });
    }

    res.status(200).json({ success: true, task: updatedTask });
});

// DELETE TASK (SOFT DELETE)
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

// SEARCH TASKS (BY TITLE OR STATUS)
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