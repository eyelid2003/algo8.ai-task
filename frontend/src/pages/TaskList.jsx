import React from 'react';

const TaskList = ({ tasks = [], onEdit, onDelete }) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p>No tasks found. Create a new one!</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => {
        const id = task._id;

        return (
          <li
            key={id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <div>
              <strong>{task.title || 'Untitled Task'}</strong> - {task.status || 'N/A'}
              {task.description && <p>{task.description}</p>}
            </div>
            <div>
              <button onClick={() => onEdit(task)} style={{ marginRight: '5px' }}>
                Edit
              </button>
              <button onClick={() => onDelete(id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
