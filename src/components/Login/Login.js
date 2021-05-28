import React, { useState } from 'react';
import '../../App.css';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';


const Login = (props) => {
    /**
     * @description Render Email Login Page.
     * @param {object} props
     */
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const setUser = props.setUser
    
    /**
     * This block of code was adapted from code found here:
     * @author h3webdevtuts
     * @see https://www.youtube.com/watch?v=cFgoSrOui2M&ab_channel=h3webdevtuts
     */
    const clearErrors = () => {
        /**
         * @description Clear errors.
         */
        setEmailError('');
        setPasswordError('');
      };

    /**
     * This block of code was adapted from code found here:
     * @author h3webdevtuts
     * @see https://www.youtube.com/watch?v=cFgoSrOui2M&ab_channel=h3webdevtuts
     */
    const handleLogin = (e) => {
        /**
         * @description Handle email login by authentication with Firebase.
         * @param {event} e
         */
        e.preventDefault()
        clearErrors();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            setUser(userCredentials.user.email);
        })
        .catch((err) => {
            switch(err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                setEmailError(err.message);
                break;
                case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
        })
    };

    return ( 
        /**
         * This block of code was adapted from code found here:
         * @author h3webdevtuts
         * @see https://www.youtube.com/watch?v=cFgoSrOui2M&ab_channel=h3webdevtuts
         */
        <section className="login">
            <form className="loginContainer">
                <div className="loginTitleContainer">
                    <h1>Sign In</h1>
                </div>
                <label>Email</label>
                <input 
                type="text" 
                autoFocus 
                required 
                value={email} 
                onChange={(event) => setEmail(event.target.value)}
                />
                <p className="errorMsg">{emailError}
                </p>

                <label>Password</label>
                <input 
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                <p className="errorMsg">{passwordError}
                </p>

                <div className="btnContainer">
                    <button type="submit" onClick={(e)=>handleLogin(e)}>Sign In</button>
                    <p>Don't have an account? <Link className="login-link" to="/signup">Sign Up</Link>
                    </p>
                </div>
            </form>
        </section>
)
};
export default Login;