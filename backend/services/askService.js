const Task = require('../models/Task');

const createTask = async (taskData) => {
    try {
        const newTask = new Task(taskData);
        return await newTask.save();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

const getUserTasks = async (userId, query) => {
    try {
        const { status, page = 1, limit = 10 } = query;
        
        const userFilter = { user: Number(userId) }; 

        const filter = { ...userFilter };
        if (status) {
            filter.status = status;
        }

        return await Task.find(filter)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 });

    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
};

const searchUserTasks = async (userId, keyword) => {
    try {
        const userFilter = { user: Number(userId) };

        const filter = {
            ...userFilter,
            title: { $regex: keyword, $options: 'i' },
        };
        
        return await Task.find(filter);

    } catch (error) {
        console.error('Error searching user tasks:', error);
        throw error;
    }
};

module.exports = {
    createTask,
    getUserTasks,
    searchUserTasks,
};