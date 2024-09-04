import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout is clicked");
    // Видаляємо токен з localStorage
    localStorage.removeItem('token');

    // Оновлюємо стан авторизації в App
    setIsAuthenticated(false);

    // Перенаправляємо користувача на сторінку логіну
    navigate('/login');
  };

  return (
    <div>
      <h1>Головна сторінка</h1>
      <button onClick={handleLogout}>Вийти</button>
      {/* Інші елементи HomePage */}
    </div>
  );
}

export default HomePage;