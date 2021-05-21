import React, { useState, useEffect } from 'react';
import '../../App.css';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

// import '.../css/Login.css';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const setUser = props.setUser
    

    const clearInputs =() => {
        setEmail('');
        setPassword('');
      };
    
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
      };

    const handleLogin = (e) => {
        e.preventDefault()
        clearErrors();
        // clearInputs();
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