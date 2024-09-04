import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserBar from './components/UserBar';
import AuthModal from './components/AuthModal';
import HomePage from './components/HomePage'; 
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTab('login');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div>
        <UserBar openModal={openModal} isAuthenticated={isAuthenticated} />

        {isModalOpen && !isAuthenticated && (
          <AuthModal
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeModal={closeModal}
            setIsAuthenticated={setIsAuthenticated} // Передача функції в AuthModal
          />
        )}

        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Navigate to="/" /> : <AuthModal activeTab="login" setActiveTab={setActiveTab} closeModal={closeModal} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Navigate to="/" /> : <AuthModal activeTab="register" setActiveTab={setActiveTab} closeModal={closeModal} setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;