import React, { useState, useEffect, useCallback } from "react";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { AuthContext } from "../lib/auth";
import { useContext } from "react";
import debounce from "lodash.debounce";

const Signup = (): JSX.Element => {
  const { user, username } = useContext(AuthContext);

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

function SignInButton(): JSX.Element {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

const SignOutButton = (): JSX.Element => {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
};

const UserNameForm = (): JSX.Element => {
  const [formValue, setFormValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, username } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    //create Refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, displayName: user.displayName });

    await batch.commit();
  };

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    const isLong = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (value.length < 3) {
      setFormValue(value);
      setLoading(false);
      setIsValid(false);
    }

    if (isLong.test(value)) {
      setFormValue(value);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  );
};

export default Signup;
