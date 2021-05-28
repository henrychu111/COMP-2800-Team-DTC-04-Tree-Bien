import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "../../css/UpdateTreeData.css";
import Modal from "react-bootstrap/Modal";

/**
 * Check if value is string height, if so return string "cm".
 * @param {string} value
 * @returns string (cm)
 */
function checkIfHeight(value) {
  if (value == "height") {
    return "(cm)";
  }
}

/**
 * Check value's string and return corresponding string.
 * @param {string} value
 * @returns string date if value is "birthday", string number if value is "height", else return string "text"
 */
function checkInputType(value) {
  if (value == "birthday") {
    return "date";
  } else if (value == "height") {
    return "number";
  } else {
    return "text";
  }
}

/**
 * Change string to titled text.
 * @param {string} value
 * @param {String} typeOfInput
 * @returns value string as titled text
 */
function titleText(value, typeOfInput) {
  if (typeOfInput == "text") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    return value;
  }
}

/**
 * Return regex for characters if value is string name, gender, species, or personality.
 * @param {string} value
 * @returns regex for characters if value is string name, gender, species, or personality
 */
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

/**
 * Return different string messages depending on value string.
 * @param {string} value
 * @returns string "Should only contain letters" if param value is name, gender, species, or personality, else return "Should only contain numbers"
 */
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

/**
 * Return number 16 or 10 depending on the value.
 * @param {*} value
 * @returns number 16 if value string is name, gender, species or personality, else return number 10
 */
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

/**
 * Return number zero if value string is height.
 * @param {string} value
 * @returns number zero
 */
function getMin(value) {
  if (value == "height") {
    return 0;
  }
}

/**
 * Return number 99999999 if value string is height.
 * @param {string} value
 * @returns number 99999999
 */
function getMax(value) {
  if (value == "height") {
    return 99999999;
  }
}

/**
 * Update tree data by editing input field in pop up modal.
 * Part of the code is found on https://react-bootstrap.github.io/components/modal/
 *
 * @author Bootstrap
 * @see https://react-bootstrap.github.io/
 *
 * @param {object} props - consists info of logged in user ID, tree doc ID, dictKey, value and closePopup
 * @returns pop up modal with dynamic field for editing
 */
const UpdateTree = (props) => {
  const [field, setField] = useState("");
  const measurement = checkIfHeight(props.dictKey);
  const typeOfInput = checkInputType(props.dictKey);
  const pattern = getPattern(props.dictKey);
  const title = getTitleMessage(props.dictKey);
  const allowLength = getMaxLength(props.dictKey);
  const minHeight = getMin(props.dictKey);
  const maxHeight = getMax(props.dictKey);
  const [locationOptions, setLocationOptions] = useState([]);
  const db = firebase.firestore();

  /**
   * Update new field input to FireStore.
   * @param {object} event - syntheticBaseEvent
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const updateDoc = {};
    updateDoc[props.dictKey] = field;
    db.collection("users")
      .doc(props.loggedinUserUpdate)
      .collection("add-new-tree")
      .doc(props.treeID)
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

  //Edit field popup
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
              {props.dictKey == "location" ? (
                <select
                  className="edit-select"
                  defaultValue={""}
                  required
                  onChange={(input) => setField(input.target.value)}
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
              ) : (
                <input
                  className="edit-input"
                  type={typeOfInput}
                  value={titleText(field, typeOfInput)}
                  maxLength={allowLength}
                  pattern={pattern}
                  title={title}
                  min={minHeight}
                  max={maxHeight}
                  required
                  onChange={(input) => setField(input.target.value)}
                />
              )}

              <button type="submit" className="edit-submit-button">
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
