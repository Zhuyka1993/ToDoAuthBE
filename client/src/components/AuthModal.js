import React from 'react';
import AuthForm from './AuthForm'; 
import '../App.css';

function AuthModal({ activeTab, setActiveTab, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <div className="auth-tabs">
          <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Вхід</button>
          <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>Реєстрація</button>
        </div>
        {/* Відображаємо відповідний контент залежно від вибраного табу */}
        {activeTab === 'login' ? (
          <AuthForm type="login" closeModal={closeModal} />
        ) : (
          <AuthForm type="register"  closeModal={closeModal}  />
        )}
      </div>
    </div>
  );
}

export default AuthModal;