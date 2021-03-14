import React from "react";
import toast from "react-hot-toast";
import Signup from "../pages/signup";

export default function Home() {
  return (
    <>
      <button onClick={() => toast.success("hello toast!!!")}>Toast me</button>
      <Signup />
    </>
  );
}
