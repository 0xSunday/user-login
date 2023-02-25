import { useState, useRef } from "react";
import classes from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState();
  const enterdEmail = useRef();
  const enterdPassword = useRef();
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = enterdEmail.current.value;
    const password = enterdPassword.current.value;

    if (isLogin) {
      console.log("login");
    } else {
      try {
        const result = await createNewUser(email, password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createNewUser = async (email, password) => {
    const response = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setIsError(data.message);
    if (!response.ok) {
      throw new Error(data.message || "somethng went wrong");
    }

    return data;
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enterdEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enterdPassword} />
        </div>
        <p className="erorr">{isError}</p>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
