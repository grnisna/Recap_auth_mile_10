import React, { useState } from "react";
import app from "../../firebase/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
const auth = getAuth(app);

const SocialMedia = () => {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
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

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.error(errorMsg);
      });
  };
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.error(errorMsg);
      });
  };

  return (
    <div>
      {user.uid ? (
        <div className="socialMedia">
          <button onClick={() => handleSignOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <hr />
          <div className="socialMedia">
            <button onClick={() => handleGoogleSignIn()}>Google</button>
            <button onClick={() => handleFacebookSignIn()}>Facebook</button>
            <button onClick={() => handleGithubSignIn()}>Github</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
