import React from "react";
// import ReactDom from 'react-dom';
import TreeForm from "./TreeForm";
import "../../css/AddTree.css";

//reference code https://codepen.io/bastianalbers/pen/PWBYvz

class AddTreeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  render() {
    return (
      <div className="addTreeSection">
        <p id="no-tree-statement">There is no tree yet.</p>
        <button id="add-tree-button" onClick={this.togglePopup.bind(this)}>
          Add a tree
        </button>
        {this.state.showPopup ? (
          <TreeForm loggedinUserTreeForm = {this.props.loggedinUserAddTree}
            // text='close'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default AddTreeButton;
