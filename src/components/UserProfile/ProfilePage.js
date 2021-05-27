import firebase from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import "../../css/ProfilePage.css";
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';


const Profile = ({currentUser, profilePhoto, uploadPhotoURL}) => {
    const [user, setUser] = useState({});
    const [image, setImage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [formDisplay, setFormDisplay] = useState(false);
    const [isBioAvailable, setIsBioAvailable] = useState(false);
    const db = firebase.firestore();


    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };
    
    const fetchUser = async () => {
        const doc = await db.collection('users').doc(currentUser).get()
        setUser({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            bio: doc.data().bio,
            profilePhoto
        })
    }
  
    useEffect(() => {
      if(user.bio) {
        setIsBioAvailable(true);
      }
    }, [])

    
  const handleImageAsFile = (e) => {
    if (e.target.files[0] != null) {
      if (e.target.files[0].type.startsWith('image')) {
        setImage(e.target.files[0])
      } else {
        alert("Please upload image file!!")
      }
    }
  }

  const handleFireBaseUpload = () => {
    if(image != null){
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
  else{
    alert("Please choose a file to upload!")
  }
}

const handleSubmit = (event) =>{
  event.preventDefault();
  db.collection("users")
  .doc(currentUser)
  .update({bio: user.bio ? user.bio : ""})
  setFormDisplay(false);
  if(user.bio) {
    setIsBioAvailable(true)
  } else {
    setIsBioAvailable(false)
  }
}

useEffect(() => {
    fetchUser()
  }, [currentUser]);

const uploadPhoto = (photoURL) => {
  uploadPhotoURL(photoURL);
  setUser({...user, profilePhoto: photoURL});
}

    return (
       <div> 
        <div style={{width: '100vw', height: '300px', background: 'url(/backgroundim.png)', paddingTop: '10%', marginBottom: "15px"}}>
              {user.firstName && <img src={ user.profilePhoto ? user.profilePhoto : "/blank_profile_picture.png"} style={{ width: '150px', height: '150px', borderRadius: "50%", display: 'block', margin: 'auto', background: 'white', border: '1px solid black'}}/>}
              
              <p style = {{textAlign: 'center', marginTop: '10px',marginBottom: '0px', color: 'white', fontSize: '30px', fontWeight: 'bold'}}>{user.firstName} {user.lastName}</p>
              <p style = {{textAlign: 'center',  color: 'white'}}>{user.email}</p>

            {user.firstName && <button onClick={showModal}>Change Avatar</button>}
            <Modal id="avatarModal" show={isOpen} onHide={hideModal}>    
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
        </Modal>
        </div>
        <div>
          {user.firstName ? !user.bio ? 
          <button style ={{float: "left"}} hidden = {isBioAvailable} onClick={() => {
            setFormDisplay(true);
            setIsBioAvailable(true);
          }}>Add Bio</button> : <div><button hidden={formDisplay} onClick={() => {
            setFormDisplay(true);
          }}>Edit Bio</button><p style={{fontSize: '24px', textAlign: "center", padding: '20px'}} hidden={formDisplay}>{user.bio}</p>
          </div> : null}
          <form onSubmit={handleSubmit} hidden={!formDisplay}>
            <textarea style={{width: '100%', height: '200px', fontSize: '18px', padding: '5px'}} value={user.bio} 
            onChange = {(event) => setUser({...user, bio: event.target.value})}/>
            <button type="submit">Update</button>
          </form>
        </div> 
      </div>  
    )
};
export default Profile