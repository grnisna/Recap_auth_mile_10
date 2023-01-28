import React, { useState } from "react";
import app from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Forms = () => {
  const [passwordError, setPasswordError] = useState("");
  const [successCreatedUser, setSuccessCreateduser] = useState(false);




  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Please write minimum two capital ");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Please write minimum 6 charateers");
      return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
      setPasswordError("Please write minimum One special charateers");
      return;
    }

    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccessCreateduser(true);
        event.target.reset();
        verifyEmail();
        updateUserName(name);
      })
      .catch((error) => {
        console.error("error:", error.message);
        setPasswordError(error.message);
      });
  };

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      alert("send an email for varification. Please check your email address.")
    })
  }

  const updateUserName = (name) =>{
    updateUserName(auth.currentUser,{
      displayName:name
    })
    .then(()=>{
      console.log("display name updated")
    })
    .catch(error =>{
      console.error(error);
    })
  }
  return (
    <div className="forms">
      <form onSubmit={handleSubmit}>
        <p>Registration Forms </p>
        <div className="inputDiv">
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" id="name" name="name" className="inputField" />
        </div>

        <div className="inputDiv">
          <label htmlFor="email">Email:</label>
          <br />
          <input type="text" id="email" name="email" className="inputField" />
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
          {passwordError ? <p className="errorMsg"> {passwordError} </p> : ""}
          {successCreatedUser ? <p className="successMsg">Successfully Registration!!</p> :""}
        </div>

        <div className="submitBtn">
          <input type="submit" value="REGISTER" className="Btn" />
        </div>
      </form>

      <SocialMedia />
      <p>Already have an account? <Link to="/login" >Log In</Link> </p>
    </div>
  );
};
export default Forms;
