import React from "react";
import TreeForm from "./TreeForm";
import "../../css/AddTree.css";
import { Link } from "react-router-dom";
import treeImage from "../../images/green_tree.png";

/**
 * Add tree button Class.
 * Part of the code is found on https://codepen.io/bastianalbers/pen/PWBYvz
 *
 * @author Bastian Albers
 * @see https://codepen.io/bastianalbers
 */
class AddTreeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showSingleTree: false,
    };
  }

  /**
   * Set showPopup state to boolean opposite.
   */
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  /**
   * Set showSingleTree state to true.
   */
  seeSingleTreeData = () => {
    this.setState({
      showSingleTree: true,
    });
  };

  /**
   * Create a new button with a specific tree name and link it to showtreedata page.
   * @param {object} tree
   * @returns a linked button with specific tree name
   */
  existingTreeButton(tree) {
    return (
      <div key={tree.id}>
        <Link
          to={{
            pathname: "/mytree/showtreedata",
            state: {
              loggedinUserData: this.props.loggedinUser,
              id: tree.id,
            },
          }}
        >
          <button className="user-trees"> {tree.name} Tree</button>
        </Link>
      </div>
    );
  }

  //Renders the mytree page which includes "Plant a new tree" button and existing tree button(s)
  render() {
    return (
      <div>
        <div id="tree-image-div">
          <img
            src={treeImage}
            alt="tree-shadow"
            id="tree-page-tree-image"
          ></img>
        </div>
        <div className="addTreeSection">
          <button id="add-tree-button" onClick={this.togglePopup.bind(this)}>
            Plant a new tree
          </button>
          {this.state.showPopup ? (
            <TreeForm
              loggedinUserTreeForm={this.props.loggedinUser}
              closePopup={this.togglePopup.bind(this)}
            />
          ) : null}
          {this.props.existingTrees.map((tree) =>
            this.existingTreeButton(tree)
          )}
        </div>
      </div>
    );
  }
}

export default AddTreeButton;
