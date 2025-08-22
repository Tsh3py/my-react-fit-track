// src/components/ActivityList.jsx
import React from 'react';
import { ACTIVITY_CATEGORIES } from './ActivityFilter';

function ActivityList({ activities, onDeleteActivity }) {
  const getCategoryInfo = (categoryId) => {
    return ACTIVITY_CATEGORIES.find(cat => cat.id === categoryId) || 
           ACTIVITY_CATEGORIES.find(cat => cat.id === 'general');
  };

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
          No Activities Found
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Try adjusting your filters or add your first activity below!
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
        📋 My Activities ({activities.length})
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activities.map(activity => {
          const categoryInfo = getCategoryInfo(activity.category || 'general');
          
          return (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                
                <div style={{
                  backgroundColor: categoryInfo.color,
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>{categoryInfo.emoji}</span>
                  <span>{categoryInfo.name}</span>
                </div>
                
                
                <div>
                  <h3 style={{ 
                    margin: '0 0 5px 0', 
                    color: '#1f2937',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {activity.name}
                  </h3>
                  <p style={{ 
                    margin: '0', 
                    color: '#6b7280',
                    fontSize: '0.9rem'
                  }}>
                    ⏱️ {activity.duration} minutes
                    {activity.dateAdded && (
                      <span style={{ marginLeft: '15px' }}>
                        📅 {new Date(activity.dateAdded).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => onDeleteActivity(activity.id)} 
                style={{ 
                  backgroundColor: '#ef4444',
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ef4444';
                }}
              >
                🗑️ Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityList;