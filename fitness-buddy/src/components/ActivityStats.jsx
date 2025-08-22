// src/components/ActivityStats.jsx
import React, { useMemo } from 'react';

function ActivityStats({ activities }) {
  
  const stats = useMemo(() => {
    if (!activities || activities.length === 0) {
      return {
        totalActivities: 0,
        totalDuration: 0,
        averageDuration: 0,
        thisWeekActivities: 0,
        thisWeekDuration: 0,
        categoryBreakdown: {},
        weeklyData: []
      };
    }

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Basic stats
    const totalActivities = activities.length;
    const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
    const averageDuration = Math.round(totalDuration / totalActivities);

    // This week's stats
    const thisWeekActivities = activities.filter(activity => {
      const activityDate = new Date(activity.dateAdded || Date.now());
      return activityDate >= oneWeekAgo;
    });
    const thisWeekDuration = thisWeekActivities.reduce((sum, activity) => sum + activity.duration, 0);

    
    const categoryBreakdown = activities.reduce((acc, activity) => {
      const category = activity.category || 'General';
      acc[category] = (acc[category] || 0) + activity.duration;
      return acc;
    }, {});

    
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.dateAdded || Date.now());
        return activityDate.toDateString() === date.toDateString();
      });
      const dayDuration = dayActivities.reduce((sum, activity) => sum + activity.duration, 0);
      
      weeklyData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        duration: dayDuration,
        activities: dayActivities.length
      });
    }

    return {
      totalActivities,
      totalDuration,
      averageDuration,
      thisWeekActivities: thisWeekActivities.length,
      thisWeekDuration,
      categoryBreakdown,
      weeklyData
    };
  }, [activities]);

  // Simple bar chart component
  const SimpleBarChart = ({ data, maxValue }) => (
    <div style={{ display: 'flex', alignItems: 'end', gap: '8px', height: '120px', padding: '10px 0' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div
            style={{
              backgroundColor: item.duration > 0 ? '#3b82f6' : '#e5e7eb',
              width: '100%',
              height: `${Math.max((item.duration / maxValue) * 100, 2)}%`,
              borderRadius: '4px 4px 0 0',
              minHeight: '4px',
              transition: 'all 0.3s ease'
            }}
            title={`${item.date}: ${item.duration} minutes, ${item.activities} activities`}
          />
          <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '5px' }}>
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );

  const maxWeeklyDuration = Math.max(...stats.weeklyData.map(d => d.duration), 1);

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
        marginBottom: '25px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        📊 Your Fitness Statistics
      </h2>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#0369a1', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {stats.totalActivities}
          </h3>
          <p style={{ color: '#0369a1', margin: '0', fontSize: '0.9rem' }}>Total Activities</p>
        </div>

        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #b3f4b5ff',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
           <h3 style={{ color: '#15803d', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {stats.totalDuration}
          </h3>
          <p style={{ color: '#15803d', margin: '0', fontSize: '0.9rem' }}>Total Minutes</p>
        </div>

        <div style={{
          backgroundColor: '#fefce8',
          border: '1px solid #fde047',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#a16207', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {stats.averageDuration}
          </h3>
          <p style={{ color: '#a16207', margin: '0', fontSize: '0.9rem' }}>Avg Duration</p>
        </div>

        <div style={{
          backgroundColor: '#fdf2f8',
          border: '1px solid #fbcfe8',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#be185d', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {stats.thisWeekDuration}
          </h3>
          <p style={{ color: '#be185d', margin: '0', fontSize: '0.9rem' }}>This Week</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div style={{
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ 
          color: '#374151', 
          marginBottom: '15px',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          📈 Last 7 Days Activity
        </h3>
        <SimpleBarChart data={stats.weeklyData} maxValue={maxWeeklyDuration} />
        <p style={{ 
          color: '#6b7280', 
          fontSize: '0.8rem', 
          textAlign: 'center',
          margin: '10px 0 0 0'
        }}>
          Daily workout duration (minutes)
        </p>
      </div>

      {/* Category Breakdown */}
      {Object.keys(stats.categoryBreakdown).length > 0 && (
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginTop: '15px'
        }}>
          <h3 style={{ 
            color: '#374151', 
            marginBottom: '15px',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            🏷️ Activity Categories
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.entries(stats.categoryBreakdown).map(([category, duration]) => (
              <div key={category} style={{
                backgroundColor: 'white',
                padding: '10px 15px',
                borderRadius: '20px',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem'
              }}>
                <strong>{category}</strong>: {duration} min
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityStats;