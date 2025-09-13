import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'todo');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
    }
    setError(''); 
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

  
    onSubmit({ title: title.trim(), description: description.trim(), status });

  
    if (!task) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', margin: 'auto' }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      {error && <p style={{ color: 'red', margin: '0', fontSize: '14px' }}>{error}</p>}

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', minHeight: '80px' }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Done</option>
      </select>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {task ? 'Update Task' : 'Create Task'}
        </button>

        {task && (
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
