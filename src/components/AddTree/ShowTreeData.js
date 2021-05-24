import React from "react";
import "../../css/ShowTreeData.css";
import treeImage from "../../images/green_tree.png";
import editIcon from "../../images/edit.png";
import UpdateTreeData from "../UpdateTree/UpdateTreeData";
import ListGroup from "react-bootstrap/ListGroup";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import firebase from "../../firebase";
const db = firebase.firestore();

//https://www.carlrippon.com/formatting-dates-and-numbers-in-react/
function formatDate(change_date) {
  console.log(change_date);
  return new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "long",
    day: "2-digit",
  }).format(Date.parse(change_date));
}

const handleBackButton = () => {
  window.history.back();
};
class ShowTreeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      // wobble: false,
      flipping: true,
      pulsing: true,
      tree: null,
    };
    this.listendb(this.props.tree.id);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      dictKey: null,
      value: null,
    });
  }

  makeTogglePopup = (dictKey, value) => {
    return () => {
      this.setState({
        showPopup: !this.state.showPopup,
        dictKey: dictKey,
        value: value,
      });
    };
  };

  listendb(treeId) {
    db.collection("users")
      .doc(this.props.tree.loggedinUserData)
      .collection("add-new-tree")
      .doc(treeId)
      .onSnapshot((doc) => {
        console.log("tree field updated");
        console.log(doc.data());
        this.setState({ tree: doc.data() });
      });
  }

  render() {
    // const flipping = this.state.flipping;
    // const pulsing = this.state.pulsing;
    // const wobble = this.state.wobble;
    console.log("showtreedata tree id", this.props.tree.id);
    console.log("showtreedata userID", this.props.tree.loggedinUserData);

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
            //add new stuff
            // onClick={() => this.setState({ flipping: false, wobble: true })}
            // onAnimationEnd={() =>
            //   this.setState({ flipping: true, wobble: true })
            // }
            // className={flipping ? "flipping" : ""}
          ></img>
          {/* <p className={pulsing ? "pulsing" : ""} id="root-for-tree">
            Root For Trees
          </p> */}
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
          <button>
            <Link to="/mytree/imageLogs">My Tree Photo Album</Link>
          </button>
        </div>
        {/* <div id="panda"></div> */}
      </div>
    );
  }
}

export default ShowTreeData;
