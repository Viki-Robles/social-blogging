import React from "react";
import toast from "react-hot-toast";
import Signup from "../pages/signup";
import { Grid } from "@material-ui/core";

export default function Home() {
  return (
    <Grid container md={6} justify="center">
      <button onClick={() => toast.success("hello toast!!!")}>Toast me</button>
      <Signup />
    </Grid>
  );
}
