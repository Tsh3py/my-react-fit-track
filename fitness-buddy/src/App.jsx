   // src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import UserHeader from './components/UserHeader';
import ActivityStats from './components/ActivityStats';
import ActivityFilter from './components/ActivityFilter';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import GoalTracker from './components/GoalTracker';


function AppContent() {
  const { user, updateUser } = useAuth();
  
  
  const [activities, setActivities] = useState(user?.activities || [
    { id: 1, name: 'Morning Run', duration: 30, category: 'cardio', dateAdded: new Date().toISOString() },
    { id: 2, name: 'Weightlifting', duration: 60, category: 'strength', dateAdded: new Date().toISOString() },
  ]);

  
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    
    
    updateUser({ activities: updatedActivities });
  };

  const handleAddActivity = (name, duration, category = 'general') => {
    const newActivity = {
      id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
      name: name,
      duration: duration,
      category: category,
      dateAdded: new Date().toISOString()
    };
    
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    
    
    updateUser({ activities: updatedActivities });
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <UserHeader />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        {/* Statistics Dashboard */}
        <ActivityStats activities={activities} />
        
        
        <GoalTracker activities={activities} />
        
        
        <ActivityFilter 
          activities={activities}
          onFilteredActivities={setFilteredActivities}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        
        <ActivityList 
          activities={filteredActivities} 
          onDeleteActivity={handleDeleteActivity} 
        />
        
        
        <ActivityForm 
          onAddActivity={handleAddActivity} 
        />
      </div>
    </div>
  );
}


function AppWithAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <h2>Loading FITNESS BUDDY...</h2>
          <p>Please wait while we set up your fitness tracker.</p>
        </div>
      </div>
    );
  }

  
  if (!user) {
    return <Login />;
  }

  
  return <AppContent />;
}


function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

export default App;