import React, { useState } from "react";
import fire from "../../firebase";
import "../../css/UpdateTreeData.css";
import Modal from "react-bootstrap/Modal";

function checkIfHeight(value) {
  if (value == "height") {
    return "(cm)";
  }
}

function checkInputType(value) {
  if (value == "birthday") {
    return "date";
  } else if (value == "height") {
    return "number";
  } else {
    return "text";
  }
}

function titleText(value, typeOfInput) {
  if (typeOfInput == "text") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    return value;
  }
}

function getPattern(value) {
  if (
    value == "name" ||
    value == "gender" ||
    value == "species" ||
    value == "personality"
  ) {
    return "[a-zA-Z ]+";
  }
}

function getTitleMessage(value) {
  if (
    value == "name" ||
    value == "gender" ||
    value == "species" ||
    value == "personality"
  ) {
    return "Should only contain letters";
  } else {
    return "Should only contain numbers";
  }
}

function getMaxLength(value) {
  if (
    value == "name" ||
    value == "gender" ||
    value == "species" ||
    value == "personality"
  ) {
    return "16";
  } else {
    return "10";
  }
}

function getMin(value) {
  if (value == "height") {
    return 0;
  }
}

function getMax(value) {
  if (value == "height") {
    return 99999999;
  }
}

//for modal https://react-bootstrap.github.io/components/modal/
const UpdateTree = (props) => {
  const [field, setField] = useState("");
  const measurement = checkIfHeight(props.dictKey);
  const typeOfInput = checkInputType(props.dictKey);
  const pattern = getPattern(props.dictKey);
  const title = getTitleMessage(props.dictKey);
  const allowLength = getMaxLength(props.dictKey);
  const minHeight = getMin(props.dictKey);
  const maxHeight = getMax(props.dictKey);
  const db = fire.firestore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateDoc = {};
    updateDoc[props.dictKey] = field;
    db.collection("users")
      .doc(props.loggedinUserUpdate)
      .collection("add-new-tree")
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
            <Modal.Title>
              Edit {props.dictKey} {measurement}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Change {props.value} to:</p>
            <form id="tree-update-form" onSubmit={handleSubmit}>
              <input
                className="edit-input"
                type={typeOfInput}
                value={titleText(field, typeOfInput)}
                maxLength={allowLength}
                pattern={pattern}
                title={title}
                // min={minHeight}
                // max={maxHeight}
                required
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

export default UpdateTree;
