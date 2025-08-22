// src/components/ActivityForm.jsx
import React, { useState } from 'react';
import { ACTIVITY_CATEGORIES } from './ActivityFilter';

function ActivityForm({ onAddActivity }) {
  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityCategory, setActivityCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activityName && activityDuration) {
      setIsSubmitting(true);
      
      
      setTimeout(() => {
        onAddActivity(activityName, parseInt(activityDuration, 10), activityCategory);
        setActivityName('');
        setActivityDuration('');
        setActivityCategory('general');
        setIsSubmitting(false);
      }, 300);
    }
  };

  
  const availableCategories = ACTIVITY_CATEGORIES.filter(cat => cat.id !== 'all');

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
        ➕ Add New Activity
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
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Activity Name
            </label>
            <input 
              type="text" 
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Morning Run, Yoga, Cycling"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
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
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Category
          </label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {availableCategories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActivityCategory(category.id)}
                style={{
                  backgroundColor: activityCategory === category.id ? category.color : 'white',
                  color: activityCategory === category.id ? 'white' : category.color,
                  border: `2px solid ${category.color}`,
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) e.target.style.backgroundColor = '#059669';
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) e.target.style.backgroundColor = '#10b981';
          }}
        >
          {isSubmitting ? '✨ Adding Activity...' : '🚀 Add Activity'}
        </button>
      </form>
    </div>
  );
}

export default ActivityForm;