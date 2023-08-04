import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, onUserStateChange } from "../api/fbase";
import { updateCurrentUser } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  //유저 정보 가져오기
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  //최신 상태 업데이트
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUser(authService.currentUser);
  };
  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
