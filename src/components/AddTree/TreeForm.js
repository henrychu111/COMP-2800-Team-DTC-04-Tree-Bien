import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "../../css/TreeForm.css";

/**
 * Return an add new tree form.
 * @param {object} props
 * @returns a form to add a new tree
 */
const TreeForm = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [species, setSpecies] = useState("");
  const [personality, setPersonality] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [location, setLocation] = useState("");
  const db = firebase.firestore();

  /**
   * Add form inputs into FireStore, reset form value to blank, and close popup.
   * @param {object} event - syntheticBaseEvent
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("users")
      .doc(props.loggedinUserTreeForm)
      .collection("add-new-tree")
      .add({
        name: name,
        gender: gender,
        height: height,
        birthday: birthday,
        species: species,
        personality: personality,
        location: location,
      })
      .then((docRef) => {
        console.log("This is doc reference", docRef.id);
        console.log("Form submitted");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setGender("");
    setHeight("");
    setBirthday("");
    setSpecies("");
    setPersonality("");
    setLocation("");
    props.closePopup();
  };

  /**
   * Query FireStore for planting sites and store results in const LocationOptions as a list.
   */
  useEffect(() => {
    db.collection("plantingsites").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const id = doc.id;
        const name = doc.data().name;
        setLocationOptions((oldLocation) => [...oldLocation, { id, name }]);
      });
    });
  }, []);

  //Add tree form with fields: name, gender, height, birthday, species, personality, and location
  return (
    <div className="popup">
      <div className="popup_inner">
        <form className="add_tree_form" onSubmit={handleSubmit}>
          <button className="form-close-button" onClick={props.closePopup}>
            x
          </button>
          <h3 className="form-title">Add New Tree Info</h3>
          <input
            type="text"
            placeholder="Name"
            className="form_input"
            value={name.charAt(0).toUpperCase() + name.slice(1)}
            pattern="[a-zA-Z ]+"
            title="Should only contain letters"
            maxLength="16"
            required
            onChange={(input) => setName(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Gender"
            className="form_input"
            value={gender.charAt(0).toUpperCase() + gender.slice(1)}
            pattern="[a-zA-Z ]+"
            title="Should only contain letters"
            maxLength="16"
            required
            onChange={(input) => setGender(input.target.value)}
          />
          <br></br>
          <input
            type="number"
            placeholder="Height (cm)"
            className="form_input"
            value={height}
            min="0"
            max="99999999"
            title="Should only contain numbers"
            required
            onChange={(input) => setHeight(input.target.value)}
          />
          <br></br>
          <input
            type="date"
            placeholder="Birthday"
            className="form_input"
            id="b-day"
            value={birthday}
            required
            onChange={(input) => setBirthday(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Species"
            className="form_input"
            value={species.charAt(0).toUpperCase() + species.slice(1)}
            pattern="[a-zA-Z ]+"
            title="Should only contain letters"
            maxLength="16"
            required
            onChange={(input) => setSpecies(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Personality"
            className="form_input"
            value={personality.charAt(0).toUpperCase() + personality.slice(1)}
            pattern="[a-zA-Z ]+"
            title="Should only contain letters"
            maxLength="16"
            required
            onChange={(input) => setPersonality(input.target.value)}
          />
          <br></br>
          <select
            className="form_input form_address"
            defaultValue={""}
            required
            onChange={(input) => setLocation(input.target.value)}
          >
            <option value="" disabled>
              Choose location
            </option>
            {locationOptions.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <button type="submit" className="form_submit_button">
            Set Up Tree!
          </button>
        </form>
      </div>
    </div>
  );
};

export default TreeForm;
