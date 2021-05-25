import firebase from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';


const Profile = ({currentUser, profilePhoto}) => {

    const [user, setUser] = useState({});
    const [image, setImage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };
    const db = firebase.firestore();

    const fetchUser = async () => {
        if(currentUser && profilePhoto) {
            const doc = await db.collection('users').doc(currentUser).get()
            setUser({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email,
                profilePhoto
            })
        }
    }

    
  const handleImageAsFile = (e) => {
    if (e.target.files[0] != null) {
      if (e.target.files[0].type.startsWith('image')) {
        setImage(e.target.files[0])
      }
    }
  }

  const handleFireBaseUpload = () => {
    const storage = firebase.storage()

    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed', (snapshot) => {
        setIsLoad(true)
    }, (error) => {
    }, () => {
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        uploadPhoto(url)
        setUser({...user, profilePhoto: url})
        setIsLoad(false)
        hideModal();
      })
    })
  }

    useEffect(() => {
        fetchUser()
      }, [currentUser]);

    const uploadPhoto = (photoURL) => {
        firebase.auth().currentUser.updateProfile({ photoURL })
        setUser({...user, profilePhoto: photoURL});
    }

    return ( 
        <div style={{width: '100vw', height: '40vh', background: 'url(/backgroundim.png)', paddingTop: '10%'}}>
            <img src={user.profilePhoto ? user.profilePhoto : "/blank_profile_picture.png"} style={{ width: '150px', height: '150px', borderRadius: "50%", display: 'block', margin: 'auto'}}/>
            
            <p style = {{textAlign: 'center', marginTop: '10px',marginBottom: '0px', color: 'white', fontSize: '30px', fontWeight: 'bold'}}>{user.firstName} {user.lastName}</p>
            <p style = {{textAlign: 'center',  color: 'white'}}>{user.email}</p>
            <button onClick={showModal}>Change Avatar</button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Avatar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                            <div className="uploadAvatar">
                            <input style={{ marginTop: '20px', marginBottom: '20px' }} name="avatar" type="file" onChange={(e) => handleImageAsFile(e)} />
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={hideModal}>Cancel</button>
                        <button 
                        disabled={isLoad}
                        onClick={!isLoad ? handleFireBaseUpload : null}>{isLoad ? 'Loading…' : 'Upload Image'}</button>
                    </Modal.Footer>
                </Modal.Dialog>
        </Modal>
        </div>
    )
};
export default Profile