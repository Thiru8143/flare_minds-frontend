// frontend/src/pages/Signup.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/api/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // light blue background
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0px 6px 18px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <h2
          style={{
            marginBottom: '20px',
            textAlign: 'center',
            color: '#1976d2', // normal blue
            fontSize: '26px',
            fontWeight: '600',
          }}
        >
          Signup
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="mobileNumber"
            placeholder="Mobile number"
            value={form.mobileNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = '#1565c0')
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = '#1976d2')
            }
          >
            Signup
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: '15px',
              color: '#e53935',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

// Shared styles
const inputStyle = {
  padding: '12px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '15px',
  outline: 'none',
  transition: '0.3s',
};

const buttonStyle = {
  backgroundColor: '#1976d2',
  color: '#ffffff',
  padding: '12px',
  fontSize: '16px',
  fontWeight: '500',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: '0.3s',
  marginTop: '5px',
};

export default Signup;
