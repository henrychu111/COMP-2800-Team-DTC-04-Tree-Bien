import firebase from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import "../../css/ProfilePage.css";
import {Modal, Form} from 'react-bootstrap';
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
    /**
     * @description Shows the Modal 
     */
    setIsOpen(true);
    };
  
    const hideModal = () => {
    /**
     * @description Close the Modal 
     */
      setIsOpen(false);
    };
    
    const fetchUser = async () => {
    /**
     * @description Fetch user information
     */
        const doc = await db
        .collection('users')
        .doc(currentUser)
        .get()
        setUser({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            bio: doc.data().bio,
            profilePhoto
        })
    }
    
  useEffect(() => {
    fetchUser()
  }, [currentUser]);

  
    useEffect(() => {
    /**
     * @description Check if user bio exists
     */
      if(user.bio) {
        setIsBioAvailable(true);
      }
    }, [])

    
  const handleImageAsFile = (file) => {
    /**
     * @description Check if file is an image file and sets image
     * @params  file: the file uploaded
     */
    if (file.target.files[0] != null) {
      if (file.target.files[0].type.startsWith('image')) {
        setImage(file.target.files[0])
      } else {
        alert("Please upload image file!!")
      }
    }
  }

  const handleFireBaseUpload = () => {
    /**
     * @description Stores image in firebase Storage
     */
    if(image != null){
    const storage = firebase.storage()
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed', (snapshot) => {
        setIsLoad(true)
    }, (error) => {
    }, () => {
      storage.ref('images')
      .child(image.name)
      .getDownloadURL()
      .then(url => {
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
    /**
     * @description Adds/updates bio to user in database
     * @params event: action when form is submitted
     */
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

const uploadPhoto = (photoURL) => {
    /**
     * @description Upload image url to photo url of user
     * @params photoURL: the new image url 
     */
  uploadPhotoURL(photoURL);
  setUser({...user, profilePhoto: photoURL});
}

    return (
    /**
     * @description Renders profile page
     */
       <div> 
        <div id="background-image" >
              {user.firstName &&  
              <img src={user.profilePhoto ? user.profilePhoto : 
                "/blank_profile_picture.png"} id = "blank-image" />}  

              <p id= "username" >{user.firstName} {user.lastName} </p>
              <p id= "user-email" >{user.email} </p>
      </div>
      {user.firstName && 
            <button id="changeAvatarBtn" onClick={showModal}>Change Avatar</button>}
            <Modal id="avatarModal" 
              show={isOpen} onHide={hideModal}>    
                    <Modal.Header closeButton>
                        <Modal.Title>Update Avatar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                            <div className="uploadAvatar">
                              <input id="input-modal" 
                                     name="avatar" 
                                     type="file" 
                                     onChange={(e) => 
                                     handleImageAsFile(e)} />
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={hideModal}>Cancel</button>
                        <button disabled={isLoad}
                          onClick={!isLoad ? handleFireBaseUpload : null}>
                          {isLoad ? 'Loading…' : 'Upload Image'}
                        </button>
                    </Modal.Footer>               
              </Modal>
      <div> {user.firstName ? !user.bio ? 
          <button className="bioBtn" hidden = {isBioAvailable} 
            onClick={() => {
              setFormDisplay(true);
              setIsBioAvailable(true) }}>
            Add Bio
          </button> : 
          <div>
            <button  className="bioBtn" hidden={formDisplay} onClick={() => 
              { setFormDisplay(true) }}>Edit Bio </button>
            <p id= "bio-text" hidden={formDisplay}> {user.bio} </p>
          </div> : null
        }
        <form onSubmit={handleSubmit} hidden={!formDisplay}>
            <Form.Control
              as="textarea"
              placeholder="Add Bio..."
              id= "bio-textarea" 
              value={user.bio} 
              onChange = {(event) => 
                setUser({...user, bio: event.target.value})}/>
            <button type="submit">Update</button>
        </form>
      </div> 
    </div>  
    )
};
export default Profile