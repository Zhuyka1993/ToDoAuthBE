import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserBar from './components/UserBar';
import AuthModal from './components/AuthModal';
import HomePage from './components/HomePage'; // Приклад компонента для головної сторінки
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Перевіряємо, чи є токен в localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <UserBar openModal={openModal} />

        {isModalOpen && (
          <AuthModal
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeModal={closeModal}
          />
        )}

        <Routes>
          {/* Головна сторінка відображається лише якщо користувач авторизований */}
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          {/* Додайте маршрут для сторінки логіну */}
          <Route
            path="/login"
            element={<AuthModal activeTab="login" setActiveTab={setActiveTab} closeModal={closeModal} />}
          />
          {/* Додайте маршрут для сторінки реєстрації, якщо потрібно */}
          <Route
            path="/register"
            element={<AuthModal activeTab="register" setActiveTab={setActiveTab} closeModal={closeModal} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;