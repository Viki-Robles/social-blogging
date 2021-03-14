import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase";
import "firebase/auth";
import { auth } from "../lib/firebase";

type ContextProps = {
  currentUser: firebase.User | null;
  setCurrentUser: any;
  user: null;
  username: null;
};

export const AuthContext = createContext<Partial<ContextProps>>({
  user: null,
  username: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {

  const [currentUser, setCurrentUser] = useState(null as firebase.User | null);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubsrcibe = firebase
      .auth()
      .onAuthStateChanged((user: any) => setCurrentUser(user));
    return unsubsrcibe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    resetPassword,
  };

  console.log(currentUser, 'there is the current user')
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
