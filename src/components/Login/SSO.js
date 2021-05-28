import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import socialMediaAuth from "../../firebase-auth";
import {
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase-method";
import { Link, useHistory } from "react-router-dom";

const SSO = ({ setUser }) => {
  /**
   * @description Render Login options for user, and link to About Us Page.
   * @param {function} setUser
   */
  
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState("");
  const db = firebase.firestore();
  const history = useHistory();

  /**
   * This block of code was adapted from code found here:
   * @author Daily Web Coding
   * @see https://www.youtube.com/watch?v=MG3ZTfdxODA&ab_channel=WebDevSimplifiedWebDevSimplifiedVerified
   */
  const handleOnClick = async (provider) => {
    /**
     * @description Login user depending on which service provider they selected, and create user collection.
     * @param {object} provider
     */
    const res = await socialMediaAuth(provider);
    console.log(res);
    setEmail(res.email);
    const fullName = res.displayName;
    const splitName = fullName.split(" ");
    const firstName = splitName[0];
    const lastName = splitName[splitName.length - 1];
    setFirstName(firstName);
    setLastName(lastName);
    setUID(res.uid);
    db.collection("users")
      .doc(res.uid)
      .set({
        firstName: firstName,
        lastName: lastName,
        email: res.email,
      })
      .then(() => {
        setUser(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="login">
        <div className="loginContainer">
          <div className="loginTitleContainer">
            <h1>Sign In</h1>
          </div>
          <div className="signin-methods">
            <button onClick={() => handleOnClick(facebookProvider)}>
              Facebook
            </button>
            <button onClick={() => handleOnClick(githubProvider)}>
              Github
            </button>
            <button onClick={() => handleOnClick(googleProvider)}>
              Google
            </button>
            <Link to="/login" className="email-signup">
              <button className="email-signup">Email</button>
            </Link>
          </div>
          <div className="btnContainer">
            <p>
              Have an account?{" "}
              <Link className="login-link" to="/login">
                Sign in
              </Link>
            </p>
            <p>
              <Link className="login-link" to="/aboutus">
                To learn more about Tree Bien
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SSO;
