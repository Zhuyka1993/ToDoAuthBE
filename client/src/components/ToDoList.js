import React from 'react';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Ваші справи</h1>
      <button onClick={handleLogout}>Логаут</button>
    </div>
  );
}

export default ToDoList;