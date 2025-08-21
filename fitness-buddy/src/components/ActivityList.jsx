// src/components/ActivityList.jsx
import React from 'react';

function ActivityList({ activities, onDeleteActivity }) {
  if (activities.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ 
          color: '#6b7280', 
          marginBottom: '10px',
          fontSize: '1.5rem'
        }}>
          No Activities Yet
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Start tracking your fitness journey by adding your first activity below!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <h2 style={{ 
        color: '#1f2937', 
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        My Activities ({activities.length})
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activities.map(activity => (
          <div
            key={activity.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          >
            <div>
              <h3 style={{ 
                margin: '0 0 5px 0', 
                color: '#1f2937',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                {activity.name}
              </h3>
              <p style={{ 
                margin: '0', 
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>
                Duration: {activity.duration} minutes
                {activity.dateAdded && (
                  <span style={{ marginLeft: '10px' }}>
                    • Added: {new Date(activity.dateAdded).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
            
            <button 
              onClick={() => onDeleteActivity(activity.id)} 
              style={{ 
                backgroundColor: '#ef4444',
                color: 'white', 
                border: 'none', 
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#dc2626';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ef4444';
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityList;