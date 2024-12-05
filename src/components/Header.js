import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Lưu vào localStorage
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div style={styles.headerContainer}>
      <button style={styles.button} onClick={() => navigate('/userlist')}>
        User List
      </button>
      <button style={styles.button} onClick={() => navigate('/online')}>
        Line Chart
      </button>
      <button style={styles.button} onClick={() => navigate('/distribution')}>
        Bar Chart
      </button>
      <button style={styles.button} onClick={() => navigate('/status')}>
        Pie Chart
      </button>
      <button style={styles.button} onClick={() => navigate('/maps')}>
        Maps
      </button>
      <button style={styles.button} onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {user ? (
        <div style={styles.userInfo}>
          <span>{user.name} ({user.role})</span>
          <button onClick={logout} style={styles.logoutButton}>Logout</button>
        </div>
      ) : (
        <button style={styles.button} onClick={() => navigate('/login')}>
          Login
        </button>
      )}


    </div>
  );
};

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#282c34',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  logoutButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

};

export default Header;
