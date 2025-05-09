import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';

const API = 'http://localhost:5000';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post(`${API}/register`, { email, password });
      alert('Registered successfully!');
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <FormWrapper title="Register">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={register} style={buttonStyle}>Register</button>
      <p style={{ marginTop: 10 }}>Already have an account? <a href="/">Login</a></p>
    </FormWrapper>
  );
};

const inputStyle = { width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' };
const buttonStyle = { width: '100%', padding: 10, backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' };

export default RegisterPage;
