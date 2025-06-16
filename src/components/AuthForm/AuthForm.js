import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, register, setAuthToken } from '../../api'; 
import './AuthForm.css';

export default function AuthForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const res = isLogin
      ? await login({ username, password })
      : await register({ username, password });

      const token = res.data.token; 

      if (!token) {
        console.error('Login did not return a token:', res.data);
        return;
      }
      console.log('Token stored:', token);
      setAuthToken(token);
      localStorage.setItem('token', token);

      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.error || err.message || 'Authentication failed');
    }
  };


  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button 
        className="toggle-auth" 
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  );
}