    // src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import UserHeader from './components/UserHeader';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';


function AppContent() {
  const { user, updateUser } = useAuth();
  
  
  const [activities, setActivities] = useState(user?.activities || [
    { id: 1, name: 'Morning Run', duration: 30 },
    { id: 2, name: 'Weightlifting', duration: 60 },
  ]);

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    
    
    updateUser({ activities: updatedActivities });
  };

  const handleAddActivity = (name, duration) => {
    const newActivity = {
      id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
      name: name,
      duration: duration,
      dateAdded: new Date().toISOString()
    };
    
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    
    
    updateUser({ activities: updatedActivities });
  };

  return (
    <div>
      <UserHeader />
      
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        <ActivityList 
          activities={activities} 
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