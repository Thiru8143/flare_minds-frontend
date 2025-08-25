// frontend/src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '18px',
    fontSize: '15px',
    fontWeight: '500',
    transition: '0.3s',
  };

  const linkHover = (e, hover) => {
    e.target.style.color = hover ? '#ffe082' : '#fff';
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 30px',
        backgroundColor: '#1976d2', // normal blue
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <div>
        <Link
          to="/"
          style={linkStyle}
          onMouseOver={(e) => linkHover(e, true)}
          onMouseOut={(e) => linkHover(e, false)}
        >
          Home
        </Link>
        {token && (
          <Link
            to="/users"
            style={linkStyle}
            onMouseOver={(e) => linkHover(e, true)}
            onMouseOut={(e) => linkHover(e, false)}
          >
            Users
          </Link>
        )}
      </div>

      <div>
        {!token ? (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseOver={(e) => linkHover(e, true)}
              onMouseOut={(e) => linkHover(e, false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={linkStyle}
              onMouseOver={(e) => linkHover(e, true)}
              onMouseOut={(e) => linkHover(e, false)}
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff7043',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#e64a19')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ff7043')}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
