import React from 'react';

function UserBar({ openModal, isAuthenticated }) {
  return (
    <div>
      {!isAuthenticated && (
        <span className="cabinet" onClick={openModal} style={{ cursor: 'pointer', color: 'blue' }}>
          Особистий кабінет
        </span>
      )}
      {/* Інші елементи UserBar, якщо вони є */}
    </div>
  );
}

export default UserBar;