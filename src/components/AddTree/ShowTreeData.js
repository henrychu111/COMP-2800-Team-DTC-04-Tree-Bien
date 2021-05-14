import React from "react";
import "../../css/ShowTreeData.css";
import treeImage from "../../images/green_tree.png";
import UpdateTreeData from "../UpdateTree/UpdateTreeData";
import ListGroup from "react-bootstrap/ListGroup";

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
    return (
      <div className="display-tree-info">
        <div>
          <img
            src={treeImage}
            alt="tree-shadow"
            id="tree-page-tree-image"
          ></img>
        </div>
        <div id="tree-page-photo-album">
          Tree Photo Album Under Construction
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
              <b> {this.props.tree.name}</b>
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
              <b> {this.props.tree.gender}</b>
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
              <b> {this.props.tree.height}</b>
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
              <b> {formatDate(this.props.tree.birthday)}</b>
            </ListGroup.Item>
            <ListGroup.Item
              className="info-item"
              onClick={this.makeTogglePopup.bind(this)(
                "specie",
                this.props.tree.specie
              )}
              variant="danger"
            >
              Specie:
              <b> {this.props.tree.specie}</b>
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
              <b> {this.props.tree.personality}</b>
            </ListGroup.Item>
          </ListGroup>

          {this.state.showPopup ? (
            <UpdateTreeData
              closePopup={this.togglePopup.bind(this)}
              dictKey={this.state.dictKey}
              value={this.state.value}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ShowTreeData;
