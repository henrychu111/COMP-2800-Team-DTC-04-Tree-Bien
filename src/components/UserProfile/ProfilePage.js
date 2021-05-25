import firebase from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Profile = ({currentUser}) => {

    const [user, setUser] = useState({});


    const db = firebase.firestore();

    const fetchUser = async () => {
        if(currentUser) {
            const doc = await db.collection('users').doc(currentUser).get()
            setUser({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email
                
            })
        }
    }

    useEffect(() => {
        fetchUser()
      }, []);

    

    return ( 
        <div style={{width: '100vw', height: '40vh', background: 'url(/background.png)', paddingTop: '10%'}}><img src="/blank_profile_picture.png" style={{ width: '150px', borderRadius: "50%", display: 'block', margin: 'auto'}}/>
            <p style = {{textAlign: 'center', marginTop: '10px',marginBottom: '0px', color: 'white', fontSize: '30px', fontWeight: 'bold'}}>{user.firstName} {user.lastName}</p>
            <p style = {{textAlign: 'center',  color: 'white'}}>{user.email}</p>
        </div>
)
};
export default Profile