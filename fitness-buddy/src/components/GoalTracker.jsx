// src/components/GoalTracker.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function GoalTracker({ activities }) {
  const { user, updateUser } = useAuth();
  const [goals, setGoals] = useState(user?.goals || []);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    type: 'weekly_duration',
    target: '',
    description: ''
  });

  
  const GOAL_TYPES = [
    { id: 'weekly_duration', name: 'Weekly Duration', unit: 'minutes', emoji: '⏱️' },
    { id: 'weekly_activities', name: 'Weekly Activities', unit: 'activities', emoji: '🎯' },
    { id: 'daily_duration', name: 'Daily Duration', unit: 'minutes', emoji: '📅' },
    { id: 'monthly_duration', name: 'Monthly Duration', unit: 'minutes', emoji: '📊' }
  ];

  
  const calculateProgress = (goal) => {
    const now = new Date();
    let relevantActivities = [];

    switch (goal.type) {
      case 'weekly_duration':
      case 'weekly_activities':
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        relevantActivities = activities.filter(activity => {
          const activityDate = new Date(activity.dateAdded || Date.now());
          return activityDate >= oneWeekAgo;
        });
        break;
      case 'daily_duration':
        const today = now.toDateString();
        relevantActivities = activities.filter(activity => {
          const activityDate = new Date(activity.dateAdded || Date.now());
          return activityDate.toDateString() === today;
        });
        break;
      case 'monthly_duration':
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        relevantActivities = activities.filter(activity => {
          const activityDate = new Date(activity.dateAdded || Date.now());
          return activityDate >= oneMonthAgo;
        });
        break;



      default:
        relevantActivities = activities;
    }

    let current = 0;
    if (goal.type.includes('duration')) {
      current = relevantActivities.reduce((sum, activity) => sum + activity.duration, 0);
    } else if (goal.type.includes('activities')) {
      current = relevantActivities.length;
    }

    const percentage = Math.min((current / goal.target) * 100, 100);
    const isCompleted = current >= goal.target;

    return { current, percentage, isCompleted };
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.target && newGoal.description) {
      const goal = {
        id: Date.now().toString(),
        ...newGoal,
        target: parseInt(newGoal.target, 10),
        createdAt: new Date().toISOString()
      };

      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      updateUser({ goals: updatedGoals });
      
      setNewGoal({ type: 'weekly_duration', target: '', description: '' });
      setShowAddGoal(false);
    }
  };

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    updateUser({ goals: updatedGoals });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ 
          color: '#1f2937', 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          margin: 0
        }}>
          🎯 Your Fitness Goals
        </h2>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          {showAddGoal ? '❌ Cancel' : '➕ Add Goal'}
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddGoal && (
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginBottom: '25px'
        }}>
          <h3 style={{ color: '#374151', marginBottom: '15px', fontSize: '1.1rem' }}>
            Create New Goal
          </h3>
          <form onSubmit={handleAddGoal}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
                  Goal Type
                </label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  {GOAL_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.emoji} {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
                  Target ({GOAL_TYPES.find(t => t.id === newGoal.type)?.unit})
                </label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="e.g., 150, 5, 30"
                  min="1"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
                Description
              </label>
              <input
                type="text"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="e.g., Stay active every week, Build strength consistently"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              🚀 Create Goal
            </button>
          </form>
        </div>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6b7280'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No Goals Set Yet</h3>
          <p>Set your first fitness goal to start tracking your progress!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {goals.map(goal => {
            const progress = calculateProgress(goal);
            const goalType = GOAL_TYPES.find(t => t.id === goal.type);
            
            return (
              <div
                key={goal.id}
                style={{
                  backgroundColor: progress.isCompleted ? '#f0fdf4' : '#f9fafb',
                  border: `2px solid ${progress.isCompleted ? '#22c55e' : '#e5e7eb'}`,
                  padding: '20px',
                  borderRadius: '10px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h4 style={{ 
                      color: progress.isCompleted ? '#15803d' : '#1f2937',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0 0 5px 0'
                    }}>
                      {goalType?.emoji} {goal.description}
                    </h4>
                    <p style={{ 
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      {goalType?.name} • Target: {goal.target} {goalType?.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{
                    backgroundColor: '#e5e7eb',
                    height: '12px',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        backgroundColor: progress.isCompleted ? '#22c55e' : '#3b82f6',
                        height: '100%',
                        width: `${progress.percentage}%`,
                        borderRadius: '6px',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Progress Text */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    color: progress.isCompleted ? '#15803d' : '#374151',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {progress.current} / {goal.target} {goalType?.unit}
                  </span>
                  <span style={{ 
                    color: progress.isCompleted ? '#15803d' : '#6b7280',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {progress.isCompleted ? '🎉 Completed!' : `${Math.round(progress.percentage)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalTracker;