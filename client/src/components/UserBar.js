import React from 'react';

function UserBar({ openModal }) {
  return (
    <div className="userbar userbar--user-outline-icon j-user-tabs" onClick={openModal}>
      <span className="cabinet">Особистий кабінет</span>
    </div>
  );
}

export default UserBar;