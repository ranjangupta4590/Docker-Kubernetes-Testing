import React from 'react';

const FormWrapper = ({ title, children }) => (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }}>
    <div style={{
      padding: 30,
      borderRadius: 10,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      width: 320,
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  </div>
);

export default FormWrapper;
