// src/components/ActivityForm.jsx
import React, { useState } from 'react';

function ActivityForm({ onAddActivity }) {
  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activityName && activityDuration) {
      setIsSubmitting(true);
      
      
      setTimeout(() => {
        onAddActivity(activityName, parseInt(activityDuration, 10));
        setActivityName('');
        setActivityDuration('');
        setIsSubmitting(false);
      }, 300);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        color: '#1f2937', 
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        Add New Activity
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Activity Name
            </label>
            <input 
              type="text" 
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Morning Run, Yoga, Cardio"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Duration (minutes)
            </label>
            <input 
              type="number" 
              value={activityDuration}
              onChange={(e) => setActivityDuration(e.target.value)}
              placeholder="e.g., 30, 45, 60"
              min="1"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {isSubmitting ? 'Adding Activity...' : 'Add Activity'}
        </button>
      </form>
    </div>
  );
}

export default ActivityForm;