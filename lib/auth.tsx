import React, { useContext, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";
import { auth } from "../lib/firebase";

type ContextProps = {
  currentUser: firebase.User | null;
  setCurrentUser: string;
  user?: string;
  username?: string;
  uid: string;
  displayName: string;
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
  const history = useHistory();

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  async function signOutButton() {
    try {
      await auth.signOut();
      history.push("/");
    } catch (error) {
      console.error(error);
    }
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
    signOutButton,
  };

  console.log(currentUser, "there is the current user");
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
