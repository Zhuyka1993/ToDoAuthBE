import React from 'react';
import AuthForm from './AuthForm';
import '../App.css'; // Переконайтеся, що ваші стилі правильно імплементовані

function AuthModal({ activeTab, setActiveTab, closeModal, setIsAuthenticated }) {
  return (
    <div className="modal open">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>&times;</button> {/* Кнопка закриття */}
        <div className="auth-tabs">
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>Увійти</button>
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>Зареєструватись</button>
        </div>
        <AuthForm type={activeTab} closeModal={closeModal} setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

export default AuthModal;