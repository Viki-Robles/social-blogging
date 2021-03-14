import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../lib/auth";

export default function Navbar(): JSX.Element {
  const { user, username } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link href="/">
              <button className="btn-logo">FEED</button>
            </Link>
          </li>
          {/* user is signed-in and has username */}
          {username && (
            <>
              <li className="push-left">
                <Link href="/admin">
                  <button className="btn-blue">Write Posts</button>
                </Link>
              </li>
              <li>
                <Link href={`/${username}`}>
                  {/* <img src={user?.photoURL} /> */}
                </Link>
              </li>
            </>
          )}

          {/* user is not signed OR has not created username */}
          {!username && (
            <li>
              <Link href="/signup">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
