import React, { useState } from "react";
import { RoleContext } from "./RoleStore";

export default function RoleProvider({ children }) {
  const [role, setRole] = useState("student");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}
