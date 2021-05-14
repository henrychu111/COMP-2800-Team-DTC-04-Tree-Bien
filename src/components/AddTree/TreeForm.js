import React, { useState } from "react";
import fire from "../../firebase";
import "../../css/TreeForm.css";

const TreeForm = ( props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [species, setSpecies] = useState("");
  const [personality, setPersonality] = useState("");
  const db = fire.firestore();

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("users")
    .doc(props.loggedinUserTreeForm)
    .collection("add-new-tree")
      .doc("New-Tree")
      .set({
        name: name,
        gender: gender,
        height: height,
        birthday: birthday,
        species: species,
        personality: personality,
      })
      .then(() => {
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
    props.closePopup();
  };

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
            required
            onChange={(input) => setName(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Gender"
            className="form_input"
            value={gender.charAt(0).toUpperCase() + gender.slice(1)}
            required
            onChange={(input) => setGender(input.target.value)}
          />
          <br></br>
          <input
            type="number"
            placeholder="Height (cm)"
            className="form_input"
            value={height}
            required
            onChange={(input) => setHeight(input.target.value)}
          />
          <br></br>
          <label id="bday-label">Birthday</label>
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
            required
            onChange={(input) => setSpecies(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Personality"
            className="form_input"
            value={personality.charAt(0).toUpperCase() + personality.slice(1)}
            required
            onChange={(input) => setPersonality(input.target.value)}
          />
          <br></br>
          <button type="submit" className="form_submit_button">
            Set Up Tree!
          </button>
        </form>
      </div>
    </div>
  );
};

export default TreeForm;
