import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';

const API = 'http://localhost:5000';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <FormWrapper title="Login">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={login} style={buttonStyle}>Login</button>
      <p style={{ marginTop: 10 }}>Don't have an account? <a href="/register">Register</a></p>
    </FormWrapper>
  );
};

const inputStyle = { width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' };
const buttonStyle = { width: '100%', padding: 10, backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' };

export default LoginPage;
