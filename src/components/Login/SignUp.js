import React, { useState, useEffect } from 'react';
import '../../App.css';
import firebase from '../../firebase';
import { Link, useHistory } from 'react-router-dom';

const SignUp = (props) => {

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const db = firebase.firestore();
    const history = useHistory();

    const clearInputs =() => {
        setEmail('');
        setPassword('');
      };
    
    const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    };

    const handleSignUp = (e) => {
        e.preventDefault()
        clearErrors();
        // clearInputs();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            db
            .collection("users")
            .doc(userCredentials.user.uid)
            .set({
                firstName: fname,
                lastName: lname,
                email: email
            })
            .then(() => {
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            switch(err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                break;
            }
        })
    };

    return ( 
        <section className="login">
            <form className="loginContainer">
                <div className="loginTitleContainer">
                    <h1>Sign Up</h1>
                </div>
                <label>First Name</label>
                <input 
                type="text" 
                autoFocus 
                required 
                value={fname} 
                onChange={(event) => setFirstName(event.target.value)} />

                <label>Last Name</label>
                <input 
                type="text" 
                autoFocus 
                required 
                value={lname} 
                onChange={(event) => setLastName(event.target.value)} />

                <label>Email</label>
                <input 
                type="text" 
                autoFocus 
                required 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} />
                <p className="errorMsg">{emailError}
                </p>

                <label>Password</label>
                <input 
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
                <p className="errorMsg">{passwordError}
                </p>

                <div className="btnContainer">
                    <button type="submit" onClick={(e) => handleSignUp(e)}>Sign Up</button>
                    <p>Have an account? <Link className="login-link" to="/signinmethod">Sign in</Link>
                    </p>
                </div>
            </form>
        </section>
)
};
export default SignUp
