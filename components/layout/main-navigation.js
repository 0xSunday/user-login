import Link from "next/link";

import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
  const { data: session } = useSession();
  // console.log(session);
  const signOuthandler = (e) => {
    e.preventDefault();
    signOut();
    // console.log(session);
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {session && (
            <li>
              <button onClick={signOuthandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
