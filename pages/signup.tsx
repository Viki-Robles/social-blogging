import React from "react";
import { googleAuthProvider } from "../lib/firebase";
import { Button } from "@material-ui/core";

const Signup = (props): JSX.Element => {
  const user = null;
  const username = null;
  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

function SignInButton() {
  return <Button></Button>;
}

const SignOutButton = (): JSX.Element => {
  return;
};

const UserNameForm = (): JSX.Element => {
  return;
};

export default Signup;
