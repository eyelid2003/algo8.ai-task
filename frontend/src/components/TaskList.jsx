
import React from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No tasks found. Add a new task above!</p>
      )}
    </div>
  );
};

export default TaskList;