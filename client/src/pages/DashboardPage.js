import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/dashboard`, {
        headers: { Authorization: token },
      });
      setData(res.data);
    } catch (err) {
      alert('Failed to fetch data');
    }
  };

  const submitData = async () => {
    if (!input.trim()) return alert("Input can't be empty");

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API}/data`,
        { content: input },
        { headers: { Authorization: token } }
      );
      setInput('');
      fetchData(); // Refresh the dashboard
    } catch (err) {
      alert('Failed to submit data');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/');
    else fetchData();
  }, []);

  return (
    <div style={{ padding: 40, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Dashboard</h2>

      {/* Logout Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      </div>

      {/* Input Form */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10,
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter content"
          style={{
            padding: '10px 15px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: 5,
            fontSize: 16
          }}
        />
        <button
          onClick={submitData}
          style={{
            padding: '10px 20px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Submit
        </button>
      </div>

      {/* Data Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center'
      }}>
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              width: 250,
              padding: 20,
              borderRadius: 10,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              textAlign: 'center'
            }}
          >
            <h3 style={{ color: '#1890ff', marginBottom: 10 }}>User {i + 1}</h3>
            <p style={{ fontSize: 16, color: '#333' }}>
              <strong>Email:</strong> {d.userEmail}
            </p>
            <p style={{ fontSize: 14, color: '#555' }}>
              <strong>Content:</strong> {d.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
