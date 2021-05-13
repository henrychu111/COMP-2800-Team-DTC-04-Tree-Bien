import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeSR1JaZlsI39VDoCJgVKteOM0e8guvIc",
    authDomain: "tree-bien.firebaseapp.com",
    projectId: "tree-bien",
    storageBucket: "tree-bien.appspot.com",
    messagingSenderId: "340858017271",
    appId: "1:340858017271:web:ed4e5da341ae0d4a334af2"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default {fire, db};