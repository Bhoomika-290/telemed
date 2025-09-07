import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h2>TeleMed+</h2>
        </div>
        <div className="header-actions">
          <span className="user-name">Dr. John Doe</span>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;