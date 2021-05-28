import React from "react";
import { Redirect } from "react-router-dom";
import "../../css/ShowTreeData.css";
import treeImage from "../../images/green_tree.png";
import editIcon from "../../images/edit.png";
import UpdateTreeData from "../UpdateTree/UpdateTreeData";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "../../firebase";
const db = firebase.firestore();

/**
 * Format date.
 * This code is found on https://www.carlrippon.com/formatting-dates-and-numbers-in-react/
 *
 * @author Carl Rippon
 * @see https://www.carlrippon.com/
 * @param {string} change_date - string indicating the date in YYYY-MM-DD form
 * @returns string in Day Month Year form, like "03 May 21"
 */
function formatDate(change_date) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "long",
    day: "2-digit",
  }).format(Date.parse(change_date));
}

/**
 * Load previous URL in history list.
 */
const handleBackButton = () => {
  window.history.back();
};

/**
 * Show tree data Class.
 * Part of the code is found on https://codepen.io/bastianalbers/pen/PWBYvz
 *
 * @author Bastian Albers
 * @see https://codepen.io/bastianalbers
 */
class ShowTreeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      tree: null,
      showDeleteModal: false,
      redirect: null,
    };
    this.listendb(this.props.tree.id);
  }

  /**
   * Set state of showPopup to opposite boolean, dictKey and value to null.
   */
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      dictKey: null,
      value: null,
    });
  }

  /**
   * Set state of showPopup to opposite boolean, dictKey and value to actual string values.
   * @param {string} dictKey - one of the following fields: name, gender, height, birthday, species, personality, or location
   * @param {string} value - user entered value for the field
   * @returns changed state of showPopup, dictKey and value
   */
  makeTogglePopup = (dictKey, value) => {
    return () => {
      this.setState({
        showPopup: !this.state.showPopup,
        dictKey: dictKey,
        value: value,
      });
    };
  };

  /**
   * Redirect to /mytree page by changing state of redirect.
   */
  redirect() {
    console.log("redirecting");
    this.setState({
      redirect: "/mytree",
    });
  }

  /**
   * Listen to changes in FireStore and update location state.
   * @param {string} treeId - tree document ID in Firestore
   */
  listendb(treeId) {
    db.collection("users")
      .doc(this.props.tree.loggedinUserData)
      .collection("add-new-tree")
      .doc(treeId)
      .onSnapshot((doc) => {
        console.log(doc.data());
        if (doc.data() != null) {
          if (doc.data().location !== "") {
            db.collection("plantingsites")
              .doc(doc.data().location)
              .get()
              .then((location) => {
                if (location.exists) {
                  this.setState({
                    tree: { ...doc.data(), location: location.data().name },
                  });
                } else {
                  this.setState({ tree: { ...doc.data(), location: "" } });
                }
              });
          } else {
            this.setState({ tree: { ...doc.data(), location: "" } });
          }
        }
      });
  }

  /**
   * Delete document from FireStore.
   */
  deleteDoc() {
    db.collection("users")
      .doc(this.props.tree.loggedinUserData)
      .collection("add-new-tree")
      .doc(this.props.tree.id)
      .delete()
      .then(() => {
        console.log("Tree doc deleted");
        this.handleClose();
        this.redirect();
      })
      .catch((error) => {
        console.log("error deleting tree doc: ", error);
      });
  }

  /**
   * Set showDeleteModal state to false.
   * @returns showDeleteModal state as false
   */
  handleClose = () => {
    return () => {
      this.setState({
        showDeleteModal: false,
      });
    };
  };

  /**
   * Set showDeleteModal state to true.
   * @returns showDeleteModal state as true
   */
  handleShow = () => {
    return () => {
      this.setState({
        showDeleteModal: true,
      });
    };
  };

  //Renders tree data page showing name, gender, height, birthday, species, personality, and location of the specific tree
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.tree == null) {
      return <div></div>;
    }

    return (
      <div className="display-tree-info">
        <div>
          <ArrowLeftOutlined
            onClick={handleBackButton}
            className="back-button-image"
          />

          <img
            src={treeImage}
            alt="tree-shadow"
            id="tree-page-tree-image"
            // onClick={this.handleShow()}
          ></img>
        </div>
        <div className="display-item-details">
          <ListGroup>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "name",
                // this.props.tree.name
                this.state.tree.name
              )}
            >
              {" "}
              Name:
              <b> {this.state.tree.name} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "gender",
                this.state.tree.gender
              )}
              variant="primary"
            >
              Gender:
              <b> {this.state.tree.gender} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "height",
                this.state.tree.height
              )}
              variant="secondary"
            >
              Height (cm):
              <b> {this.state.tree.height} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "birthday",
                this.state.tree.birthday
              )}
              variant="success"
            >
              Birthday:
              <b> {formatDate(this.state.tree.birthday)} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "species",
                this.state.tree.species
              )}
              variant="danger"
            >
              Species:
              <b> {this.state.tree.species} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "personality",
                this.state.tree.personality
              )}
              variant="warning"
            >
              Personality:
              <b> {this.state.tree.personality} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "location",
                this.state.tree.location
              )}
              variant="primary"
            >
              Location:
              <br></br>
              <b> {this.state.tree.location} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
          </ListGroup>

          {this.state.showPopup ? (
            <UpdateTreeData
              loggedinUserUpdate={this.props.tree.loggedinUserData}
              treeID={this.props.tree.id}
              closePopup={this.togglePopup.bind(this)}
              dictKey={this.state.dictKey}
              value={this.state.value}
            />
          ) : null}
        </div>
        <div id="tree-page-photo-album">
          <Link
            to={{
              pathname: "/mytree/imageLogs",
              state: {
                treeID: this.props.tree.id,
              },
            }}
          >
            <button id="photo-album-button">
              <b>My Tree Photo Album</b>
            </button>
          </Link>
        </div>

        <Modal
          class="delete-modal"
          show={this.state.showDeleteModal}
          onHide={this.handleClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Tree?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your tree?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.deleteDoc.bind(this)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <button id="delete-tree-button" onClick={this.handleShow()}>
          Delete Tree
        </button>
      </div>
    );
  }
}

export default ShowTreeData;
