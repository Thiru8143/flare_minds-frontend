// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Home = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // optional: verify token & fetch fresh user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get('/api/users/me');
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Could not fetch user', err);
      }
    };
    if (!user) fetchMe();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user?.firstName || 'User'}</h2>
      <p>This is the home page — protected route.</p>
    </div>
  );
};

export default Home;
