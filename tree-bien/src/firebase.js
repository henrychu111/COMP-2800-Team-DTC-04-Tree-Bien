import firebase from 'firebase'

var firebaseApp = firebase.initializeApp({
    // Your web app's Firebase configuration
    apiKey: "AIzaSyC88T9Oq0dZ1V6Pc81RosbGssVTJqtixp4",
    authDomain: "tree-bien-app.firebaseapp.com",
    projectId: "tree-bien-app",
    storageBucket: "tree-bien-app.appspot.com",
    messagingSenderId: "802230625773",
    appId: "1:802230625773:web:2a253d51dcd36d6f6e33e4"
});

var db = firebaseApp.firestore();

export { db };