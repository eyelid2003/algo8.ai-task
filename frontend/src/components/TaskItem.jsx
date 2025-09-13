
import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      <div>
        <h4 style={{ margin: '0 0 5px' }}>{task.title}</h4>
        <p style={{ margin: '0', color: '#555' }}>{task.description}</p>
        <small style={{ color: '#888' }}>Status: {task.status}</small>
      </div>
      <div>
        <button 
          onClick={() => onEdit(task)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;