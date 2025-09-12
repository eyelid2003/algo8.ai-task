const Task = require('../models/Task');

// Create a new task
const createTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    return await newTask.save();
  } catch (error) {
    // Log the error and re-throw to allow the calling function to handle it.
    console.error('Error creating task:', error);
    throw error;
  }
};

// Get all tasks of a user with filters
const getUserTasks = async (userId, query) => {
  const { status, page = 1, limit = 10 } = query;
  const filter = { user: userId, isDeleted: false };

  if (status) {
    filter.status = status;
  }

  return await Task.find(filter)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 });
};

// Search tasks by keyword
const searchUserTasks = async (userId, keyword) => {
  const filter = {
    user: userId,
    title: { $regex: keyword, $options: 'i' },
    isDeleted: false,
  };
  return await Task.find(filter);
};

// Get a task by ID
const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
    isDeleted: false,
  });
  if (!task) {
    throw new Error('Task not found or you are not authorized');
  }
  return task;
};

// Soft delete a task
const deleteTaskById = async (taskId, userId) => {
  // Use findOneAndUpdate directly to update and return the document in one operation
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, user: userId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error('Task not found or you are not authorized');
  }

  return updatedTask;
};

// Update a task
const updateTaskById = async (taskId, userId, updateData) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, user: userId, isDeleted: false },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    throw new Error('Task not found or you are not authorized');
  }
  return updatedTask;
};

module.exports = {
  createTask,
  getUserTasks,
  searchUserTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
};