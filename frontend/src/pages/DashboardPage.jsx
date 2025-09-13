import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import TaskForm from '../components/forms/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" />;
  }


  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      const taskArray = data.tasks || [];
      setTasks(taskArray);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Failed to load tasks';
      setError(errorMsg);
      if (errorMsg === 'Unauthorized' || err?.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 


  const handleCreateTask = async (task) => {
    try {
      await createTask(task);
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Failed to create task';
      alert(`Failed to create task: ${JSON.stringify(errorMsg)}`);
    }
  };


  const handleUpdateTask = async (updatedTask) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id || editingTask.id, updatedTask);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Failed to update task';
      alert(`Failed to update task: ${JSON.stringify(errorMsg)}`);
    }
  };


  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error(err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Failed to delete task';
      alert(`Failed to delete task: ${JSON.stringify(errorMsg)}`);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Task Dashboard</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>

      <h3 style={{ color: '#333' }}>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
      <TaskForm
        task={editingTask}
        onSubmit={(taskData) =>
          editingTask ? handleUpdateTask(taskData) : handleCreateTask(taskData)
        }
        onCancel={() => setEditingTask(null)}
      />

      <h3 style={{ color: '#333' }}>My Tasks</h3>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && tasks.length === 0 && (
        <p>No tasks found. Create a new one!</p>
      )}

      {Array.isArray(tasks) && (
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default DashboardPage;