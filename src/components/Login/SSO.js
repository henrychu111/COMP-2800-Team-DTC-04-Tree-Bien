import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import socialMediaAuth from '../../firebase-auth';
import { facebookProvider, githubProvider, googleProvider } from '../../firebase-method';
import { Link, useHistory } from 'react-router-dom';


const SSO = ({setUser}) => {

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUID] = useState('');
    const db = firebase.firestore();
    const history = useHistory();

    const handleOnClick = async (provider) => {
        const res = await socialMediaAuth(provider);
        console.log(res);
        setEmail(res.email);
        const fullName = res.displayName;
        const splitName = fullName.split(' ');
        const firstName = splitName[0];
        const lastName = splitName[splitName.length - 1];
        setFirstName(firstName);
        setLastName(lastName);
        setUID(res.uid);
        db
        .collection("users")
        .doc(res.uid)
        .set({
            firstName: firstName,
            lastName: lastName,
            email: res.email
        })
        .then(() => {
            setUser(email);
            history.push("/");
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <div>
            <section className="login">
                <div className="loginContainer">
                    <div className="loginTitleContainer">
                        <h1>Sign In</h1>
                    </div>
                    <div className="signin-methods">
                        <button onClick={() => handleOnClick(facebookProvider)}>Facebook</button>
                        <button onClick={() => handleOnClick(githubProvider)}>Github</button>
                        <button onClick={() => handleOnClick(googleProvider)}>Google</button>
                        <Link to="/login" className="email-signup"><button className="email-signup">Email</button></Link>
                    </div>
                    <div className="btnContainer">
                        <p>Have an account? <Link className="login-link" to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SSO
