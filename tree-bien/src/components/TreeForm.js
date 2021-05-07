import React, { useState } from "react";
// import ReactDom from 'react-dom';
import { db } from "../firebase";

const TreeForm = (props) => {
  // console.log(props);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [treeFamily, setTreeFamily] = useState("");
  const [personality, setPersonality] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("add-new-tree")
      .add({
        name: name,
        gender: gender,
        height: height,
        birthday: birthday,
        treeFamily: treeFamily,
        personality: personality,
      })
      .then(() => {
        alert("Form submitted");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setGender("");
    setHeight("");
    setBirthday("");
    setTreeFamily("");
    setPersonality("");
    props.closePopup();
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="form-close-button" onClick={props.closePopup}>
          x
        </button>
        <form className="add_tree_form" onSubmit={handleSubmit}>
          <h3 className="form-title">Add New Tree Info</h3>
          <input
            type="text"
            placeholder="NAME"
            className="form_input"
            value={name}
            onChange={(input) => setName(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="GENDER"
            className="form_input"
            value={gender}
            onChange={(input) => setGender(input.target.value)}
          />
          <br></br>
          <input
            type="number"
            placeholder="HEIGHT (CM)"
            className="form_input"
            value={height}
            onChange={(input) => setHeight(input.target.value)}
          />
          <br></br>
          <label id="bday-label">Birthday</label>
          <input
            type="date"
            placeholder="BIRTHDAY"
            className="form_input"
            id="b-day"
            value={birthday}
            onChange={(input) => setBirthday(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="TREE FAMILY"
            className="form_input"
            value={treeFamily}
            onChange={(input) => setTreeFamily(input.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="PERSONALITY"
            className="form_input"
            value={personality}
            onChange={(input) => setPersonality(input.target.value)}
          />
          <br></br>
          <button type="submit" class="form_submit_button">
            SET UP TREE!
          </button>
        </form>
      </div>
    </div>
  );
};

// class TreeForm extends React.Component {
//   render() {
//     return (
//       <div className='popup'>
//         <div className='popup_inner'>
//           <button onClick={this.props.closePopup}>x</button>
//           <form className='add_tree_form'>
//                 <h3>Add New Tree Info</h3>
//                 <input type="text" placeholder="NAME" className="form_input" />
//                 <br></br>
//                 <input type="text" placeholder="GENDER" className="form_input" />
//                 <br></br>
//                 <input type="number" placeholder="HEIGHT (CM)" className="form_input" />
//                 <br></br>
//                 <input type="date" placeholder="BIRTHDAY" className="form_input" />
//                 <br></br>
//                 <input type="text" placeholder="TREE FAMILY" className="form_input" />
//                 <br></br>
//                 <input type="text" placeholder="PERSONALITY" className="form_input" />
//                 <br></br>
//                 <button type="submit" class="form_submit_button">Set up tree!</button>
//             </form>
//           </div>
//       </div>
//     );
//   }
// }

export default TreeForm;
