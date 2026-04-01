import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  return (
    <RoleContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
