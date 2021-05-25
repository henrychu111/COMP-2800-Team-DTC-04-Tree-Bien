import React from "react";
// import ReactDom from 'react-dom';
import TreeForm from "./TreeForm";
import "../../css/AddTree.css";
import ShowTreeData from "./ShowTreeData";
import { Link } from "react-router-dom";

//reference code https://codepen.io/bastianalbers/pen/PWBYvz

class AddTreeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showSingleTree: false,
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  seeSingleTreeData = () => {
    this.setState({
      showSingleTree: true,
    });
  };

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

  render() {
    return (
      <div className="addTreeSection">
        <button id="add-tree-button" onClick={this.togglePopup.bind(this)}>
          Add a new tree
        </button>
        {this.state.showPopup ? (
          <TreeForm
            loggedinUserTreeForm={this.props.loggedinUser}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
        {this.props.existingTrees.map((tree) => this.existingTreeButton(tree))}
      </div>
    );
  }
}

export default AddTreeButton;
