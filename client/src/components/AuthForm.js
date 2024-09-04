import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AuthForm({ type, closeModal, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
        localStorage.setItem('token', result.token);
        setShowPopup(result.name);
        setIsAuthenticated(true);

        setTimeout(() => {
          setShowPopup(false);
          closeModal();
          navigate('/'); 
        }, 3000);
      } else {
        setError(result.message || 'Щось пішло не так');
      }
    } catch (error) {
      setError('Не вдалося виконати запит, спробуйте пізніше.');
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          Вітаю, {showPopup}!
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
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
    </>
  );
}

export default AuthForm;