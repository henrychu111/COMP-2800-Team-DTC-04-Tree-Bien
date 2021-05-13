import React, { useState } from "react";
import fire from "../../firebase";
import "../../css/UpdateTreeData.css";
import Modal from "react-bootstrap/Modal";

//for modal https://react-bootstrap.github.io/components/modal/
const UpdateTree = (props) => {
  const [field, setField] = useState(props.value);
  console.log(props);
  const db = fire.firestore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateDoc = {};
    updateDoc[props.dictKey] = field;
    db.collection("add-new-tree")
      .doc("New-Tree")
      .update(updateDoc)
      .then(() => {
        console.log("Updated");
      })
      .catch((error) => {
        console.log(error.message);
      });

    setField("");
    props.closePopup();
  };

  return (
    <div className="edit-data-popup">
      <div className="edit-data-popup-inner">
        <Modal.Dialog>
          <Modal.Header closeButton onClick={props.closePopup}>
            <Modal.Title>Edit {props.dictKey} </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Change {props.value} to:</p>
            <form id="tree-update-form" onSubmit={handleSubmit}>
              <input
                className="edit-input"
                type="text"
                value={field}
                onChange={(input) => setField(input.target.value)}
              />
              <button type="submit" class="edit-submit-button">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
};

//   return (
//     <div className="edit-data-popup">
//       <div className="edit-data-popup-inner">
//         <button className="form-close-button" onClick={props.closePopup}>
//           x
//         </button>

//         <p>
//           Edit {props.dictKey} {props.value} to:
//         </p>

//         <form id="tree-update-form" onSubmit={handleSubmit}>
//           <input
//             className="edit-input"
//             type="text"
//             value={field}
//             onChange={(input) => setField(input.target.value)}
//           />
//           <button type="submit" class="edit-submit-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default UpdateTree;
