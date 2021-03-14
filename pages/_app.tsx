import { AppProps } from "next/app";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/NavBar";
import Loader from "../components/Loader";
import { AuthProvider } from "../lib/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Loader show />
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default MyApp;
