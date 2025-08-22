// src/components/ActivityFilter.jsx
import React, { useState } from 'react';


const ACTIVITY_CATEGORIES = [
  { id: 'all', name: 'All Activities', emoji: '🏃‍♂️', color: '#6b7280' },
  { id: 'cardio', name: 'Cardio', emoji: '❤️', color: '#ef4444' },
  { id: 'strength', name: 'Strength', emoji: '💪', color: '#f59e0b' },
  { id: 'flexibility', name: 'Flexibility', emoji: '🧘‍♀️', color: '#8b5cf6' },
  { id: 'sports', name: 'Sports', emoji: '⚽', color: '#10b981' },
  { id: 'outdoor', name: 'Outdoor', emoji: '🌲', color: '#059669' },
  { id: 'general', name: 'General', emoji: '🏋️‍♂️', color: '#3b82f6' }
];

function ActivityFilter({ activities, onFilteredActivities, selectedCategory, onCategoryChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  
  React.useEffect(() => {
    let filtered = activities;

    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(activity => 
        (activity.category || 'general') === selectedCategory
      );
    }

    
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilteredActivities(filtered);
  }, [activities, selectedCategory, searchTerm, onFilteredActivities]);

  
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return activities.length;
    return activities.filter(activity => (activity.category || 'general') === categoryId).length;
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ 
        color: '#1f2937', 
        marginBottom: '20px',
        fontSize: '1.3rem',
        fontWeight: 'bold'
      }}>
        🔍 Filter & Search Activities
      </h3>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search activities by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

      {/* Category Filter Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {ACTIVITY_CATEGORIES.map(category => {
          const count = getCategoryCount(category.id);
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              style={{
                backgroundColor: isSelected ? category.color : 'white',
                color: isSelected ? 'white' : category.color,
                border: `2px solid ${category.color}`,
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = category.color;
                  e.target.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = category.color;
                }
              }}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
              <span style={{
                backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || searchTerm) && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f3f4f6',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: '#374151'
        }}>
          <strong>Active filters:</strong>
          {selectedCategory !== 'all' && (
            <span style={{ marginLeft: '8px' }}>
              Category: {ACTIVITY_CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </span>
          )}
          {searchTerm && (
            <span style={{ marginLeft: '8px' }}>
              Search: "{searchTerm}"
            </span>
          )}
          <button
            onClick={() => {
              onCategoryChange('all');
              setSearchTerm('');
            }}
            style={{
              marginLeft: '10px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export { ACTIVITY_CATEGORIES };
export default ActivityFilter;