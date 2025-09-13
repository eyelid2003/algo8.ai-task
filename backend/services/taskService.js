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

const searchUserTasks = async (userId, keyword) => {
  const filter = {
    user: userId,
    title: { $regex: keyword, $options: 'i' },
    isDeleted: false,
  };
  return await Task.find(filter);
};

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

const deleteTaskById = async (taskId, userId) => {

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