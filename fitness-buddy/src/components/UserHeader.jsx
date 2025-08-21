// src/components/UserHeader.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function UserHeader() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <div>
        <h1 style={{ 
          margin: '0', 
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          FITNESS BUDDY
        </h1>
        <p style={{ 
          margin: '5px 0 0 0', 
          fontSize: '0.9rem',
          opacity: '0.9'
        }}>
          Welcome back, {user?.username}!
        </p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            margin: '0', 
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {user?.email}
          </p>
          <p style={{ 
            margin: '0', 
            fontSize: '0.8rem',
            opacity: '0.8'
          }}>
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
          </p>
        </div>
        
        <button
          onClick={logout}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default UserHeader;