import React from 'react';

export default function NotFound() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#2C3851',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 24,
      textAlign: 'center',
    }}>
      <div style={{fontSize: 72, marginBottom: 24}}>404</div>
      <div>Oops! Page not found.</div>
      <div style={{marginTop: 24, opacity: 0.5, fontSize: 16}}>Return to <a href="/" style={{color:'#fff', textDecoration:'underline'}}>Home</a></div>
    </div>
  );
}
