import React from "react";
import "../showTreeData.css";

function ShowTreeData(props) {
  return (
    <div className="display-tree-info">
      <div className="info-item">
        Name:<br></br>
        <b>{props.tree.name}</b>
      </div>
      <div className="info-item">
        Gender:<br></br>
        <b>{props.tree.gender}</b>
      </div>
      <div className="info-item">
        Height:<br></br>
        <b>{props.tree.height}cm</b>
      </div>
      <div className="info-item">
        Birthday:<br></br>
        <b>{props.tree.birthday}</b>
      </div>
      <div className="info-item">
        Tree Family:<br></br>
        <b>{props.tree.treeFamily}</b>
      </div>
      <div className="info-item">
        Personality:<br></br>
        <b>{props.tree.personality}</b>
      </div>
    </div>
  );
}

export default ShowTreeData;
