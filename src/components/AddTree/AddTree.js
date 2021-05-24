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

  // goToShowTree(tree) {
  //   console.log("reading go to show tree function");
  //   this.render();
  //   {
  //     return (
  //       <div>
  //         <ShowTreeData tree={tree} />
  //       </div>
  //     );
  //   }
  // }

  existingTreeButton(tree) {
    // console.log("addtree existing tree", this.props.existingTrees);
    return (
      <div key={tree.id}>
        <button className="user-trees">
          <Link
            to={{
              pathname: "/mytree/showtreedata",
              state: {
                // name: tree.name,
                // gender: tree.gender,
                // height: tree.height,
                // birthday: tree.birthday,
                // species: tree.species,
                // personality: tree.personality,
                loggedinUserData: this.props.loggedinUser,
                // id: this.props.treeID,
                id: tree.id,
              },
            }}
          >
            {" "}
            {tree.name} Tree
          </Link>
        </button>
      </div>
    );
  }

  render() {
    console.log("Addtree userid", this.props.loggedinUser);
    console.log("num trees: ", this.props.existingTrees.length);

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

//   render() {
//     return (
//       <div className="addTreeSection">
//         {/* <p id="no-tree-statement">There is no tree yet.</p> */}
//         <button id="add-tree-button" onClick={this.togglePopup.bind(this)}>
//           Add a tree
//         </button>
//         {this.state.showPopup ? (
//           <TreeForm
//             loggedinUserTreeForm={this.props.loggedinUserAddTree}
//             // text='close'
//             closePopup={this.togglePopup.bind(this)}
//           />
//         ) : null}
//       </div>
//     );
//   }
// }

export default AddTreeButton;
