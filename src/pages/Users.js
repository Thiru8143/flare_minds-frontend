// frontend/src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.get('/api/users');
        setUsers(res.data);
      } catch (error) {
        setErr(error.response?.data?.message || 'Failed to load users');
      }
    };
    getUsers();
  }, []);

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        }}
      >
        <h2
          style={{
            marginBottom: '20px',
            fontSize: '26px',
            fontWeight: '600',
            color: '#2c3e50',
            borderBottom: '2px solid #eee',
            paddingBottom: '10px',
          }}
        >
          All Users (except you)
        </h2>

        {err && (
          <p
            style={{
              color: '#e74c3c',
              fontSize: '15px',
              marginBottom: '15px',
            }}
          >
            {err}
          </p>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {users.map((u) => (
            <li
              key={u._id}
              style={{
                padding: '15px',
                marginBottom: '12px',
                borderRadius: '8px',
                backgroundColor: '#f9fafc',
                border: '1px solid #ddd',
                fontSize: '15px',
                color: '#34495e',
                transition: '0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#eef4fb')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9fafc')}
            >
              <span style={{ fontWeight: '600', color: '#2c3e50' }}>
                {u.firstName} {u.lastName}
              </span>{' '}
              — <span style={{ color: '#007bff' }}>{u.email}</span> —{' '}
              <span style={{ color: '#555' }}>{u.mobileNumber}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
