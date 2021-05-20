import React from "react";
import "../../css/ShowTreeData.css";
import treeImage from "../../images/green_tree.png";
import editIcon from "../../images/edit.png";
import UpdateTreeData from "../UpdateTree/UpdateTreeData";
import ListGroup from "react-bootstrap/ListGroup";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Link } from "react-router-dom";

//https://www.carlrippon.com/formatting-dates-and-numbers-in-react/
function formatDate(change_date) {
  console.log(change_date);
  return new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "long",
    day: "2-digit",
  }).format(Date.parse(change_date));
}

class ShowTreeData extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      // wobble: false,
      flipping: true,
      pulsing: true,
    };
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

  render() {
    const flipping = this.state.flipping;
    const pulsing = this.state.pulsing;
    // const wobble = this.state.wobble;

    return (
      <div className="display-tree-info">
        <div>
          <img
            src={treeImage}
            alt="tree-shadow"
            id="tree-page-tree-image"
            //add new stuff
            // onClick={() => this.setState({ flipping: false, wobble: true })}
            // onAnimationEnd={() =>
            //   this.setState({ flipping: true, wobble: true })
            // }
            className={flipping ? "flipping" : ""}
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
                this.props.tree.name
              )}
            >
              {" "}
              Name:
              <b> {this.props.tree.name} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "gender",
                this.props.tree.gender
              )}
              variant="primary"
            >
              Gender:
              <b> {this.props.tree.gender} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "height",
                this.props.tree.height
              )}
              variant="secondary"
            >
              Height (cm):
              <b> {this.props.tree.height} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>

            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "birthday",
                this.props.tree.birthday
              )}
              variant="success"
            >
              Birthday:
              <b> {formatDate(this.props.tree.birthday)} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "species",
                this.props.tree.species
              )}
              variant="danger"
            >
              Species:
              <b> {this.props.tree.species} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "personality",
                this.props.tree.personality
              )}
              variant="warning"
            >
              Personality:
              <b> {this.props.tree.personality} </b>
              <img className="edit" src={editIcon}></img>
            </ListGroup.Item>
          </ListGroup>

          {this.state.showPopup ? (
            <UpdateTreeData
              loggedinUserUpdate={this.props.loggedinUserData}
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
        <div id="panda"></div>
      </div>
    );
  }
}

export default ShowTreeData;
