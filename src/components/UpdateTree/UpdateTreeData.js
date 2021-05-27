import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
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
  const [locationOptions, setLocationOptions] = useState([]);
  const db = firebase.firestore();

  const handleSubmit = (e) => {
    console.log("update tree, this is the id", props.treeID);
    e.preventDefault();

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

  // useEffect(() => {
  //   db.collection("plantingsites").onSnapshot((snapshot) => {
  //     const locationList = [];
  //     snapshot.forEach((doc) => {
  //       const data = doc.data();
  //       const documentLocation = data.address;
  //       locationList.push(documentLocation);
  //     });
  //     setLocationOptions(locationList);
  //   });
  // }, []);

  useEffect(() => {
    db.collection("plantingsites").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const id = doc.id;
        const name = doc.data().name;
        setLocationOptions((oldLocation) => [...oldLocation, { id, name }]);
        console.log("location", locationOptions);
      });
    });
  }, []);

  // useEffect(() => {
  //   db.collection("plantingsites").onSnapshot((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       const id = doc.id;
  //       const name = doc.data().name;
  //       setLocationOptions(oldLocation => [...oldLocation, {id, name}]);
  //       console.log("location", locationOptions);
  //     });
  //   });
  // }, []);

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
