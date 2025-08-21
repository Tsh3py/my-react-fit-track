// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('fitness_buddy_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('fitness_buddy_user');
      }
    }
    setLoading(false);
  }, []);

  
  const register = async (username, email, password) => {
    try {
      
      
      
      
      const existingUsers = JSON.parse(localStorage.getItem('fitness_buddy_users') || '[]');
      const userExists = existingUsers.find(u => u.email === email || u.username === username);
      
      if (userExists) {
        throw new Error('User with this email or username already exists');
      }

      
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: btoa(password), 
        createdAt: new Date().toISOString(),
        activities: []
      };

      
      existingUsers.push(newUser);
      localStorage.setItem('fitness_buddy_users', JSON.stringify(existingUsers));

      
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('fitness_buddy_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  
  const login = async (email, password) => {
    try {

      const existingUsers = JSON.parse(localStorage.getItem('fitness_buddy_users') || '[]');
      
      
      const foundUser = existingUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found');
      }

      
      const decodedPassword = atob(foundUser.password);
      if (decodedPassword !== password) {
        throw new Error('Invalid password');
      }

      
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('fitness_buddy_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitness_buddy_user');
  };

  
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('fitness_buddy_user', JSON.stringify(updatedUser));
    
    
    const existingUsers = JSON.parse(localStorage.getItem('fitness_buddy_users') || '[]');
    const userIndex = existingUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...userData };
      localStorage.setItem('fitness_buddy_users', JSON.stringify(existingUsers));
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};