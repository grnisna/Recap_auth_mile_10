import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const LoginForm = () => {
  const [user, setUser] = useState({});
  const [catchError, setCatchError] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        setUser(user);
        event.target.reset();
      })
      .catch((error) => {
        const showError = error.message;
        setCatchError(showError);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((errror) => {
        const errorMsg = "error to catch";
        console.log(errorMsg);
      });
  };

  const handleGetCurrentEmail = (event) => {
    const email = event.target.value;
    console.log(email);
    setUserEmail(email);
  };

  const handleResetPassword = () => {
    if(!userEmail){
      alert("Enter your Email address");
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Reset password !! Check your Email address");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="forms">
      <form onSubmit={handleSubmit}>
        <p>Log in</p>

        <div className="inputDiv">
          <label htmlFor="email">Email:</label>
          <br />
          <input onBlur={handleGetCurrentEmail} type="text" id="email" name="email" className="inputField" />
        </div>

        <div className="inputDiv">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="inputField"
          />
        </div>
        {/* {catchError ? <p className="errorMsg"> {catchError} </p> : ""} */}

        <div className="submitBtn">
          {user.uid ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <input type="submit" value="LOGIN" className="Btn" />
          )}
        </div>
      </form>

      <p>
        For Registration <Link to="/registration">Registration</Link>{" "}
      </p>
      <small>
        Forget Password? <button onClick={handleResetPassword}>Reset Now</button>{" "}
      </small>
    </div>
  );
};

export default LoginForm;
