import { AppProps } from "next/app";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/NavBar";
// import Loader from "../components/Loader";
import { AuthProvider } from "../lib/auth";
import { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUserData } from '../lib/hooks';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const userData = useUserData();

  return (
    <>
      <AuthProvider value={userData}>
        <Navbar />
        {/* <Loader show /> */}
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default MyApp;
