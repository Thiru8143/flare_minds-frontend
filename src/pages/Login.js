// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/login', { identifier, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0px 6px 18px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '380px'
      }}>
        <h2 style={{
          marginBottom: '20px',
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '28px',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          Login
        </h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            placeholder="Email or Mobile"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
            style={{
              padding: '12px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: '12px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <button type="submit" style={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Login
          </button>
        </form>
        {err && <p style={{
          marginTop: '15px',
          color: '#e74c3c',
          fontSize: '14px',
          textAlign: 'center'
        }}>{err}</p>}
      </div>
    </div>
  );
};

export default Login;
