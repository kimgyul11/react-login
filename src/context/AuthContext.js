import React, { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange } from "../api/fbase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
