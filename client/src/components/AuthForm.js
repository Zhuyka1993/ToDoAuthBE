import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm({ type, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = type === 'login' ? '/login' : '/register';
    const data = type === 'login' ? { email, password } : { email, password, name };

    try {
      const response = await fetch(`http://localhost:5001${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Якщо залогінився, то переход на основну сторінку
        console.log('Success:', result);
        localStorage.setItem('token', result.token); // Збереження токена
        closeModal(); // Закриває модальне вікно
        navigate('/'); // Перенаправлення на головну сторінку
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{type === 'login' ? 'Увійти' : 'Зареєструватись'}</button>
    </form>
  );
}

export default AuthForm;