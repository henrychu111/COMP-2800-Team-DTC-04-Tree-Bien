import { useState, useEffect } from "react";
import AddTreeButton from "./AddTree";
import ShowTreeData from "./ShowTreeData";
import fire from "../../firebase";

function MyTreePage() {
  //if database has NO entry, return AddTree
  //else return ShowTree
  const [trees, setTrees] = useState([]);
  const db = fire.firestore();

  const fetchDb = () => {
    db.collection("add-new-tree")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((tree) => {
          setTrees([...trees, tree.data()]);
        });
      });
  };
  const listenDb = () => {
    db.collection("add-new-tree").onSnapshot((snapshot) => {
      snapshot.docs.forEach((tree) => {
        setTrees([...trees, tree.data()]);
      });
    });
  };

  useEffect(fetchDb, []);
  useEffect(listenDb, []);

  if (trees.length > 0) {
    return ShowTree(trees);
  } else {
    return AddTree();
  }
}

function AddTree() {
  console.log("Hello");
  return (
    <div>
      <AddTreeButton />
    </div>
  );
}

function ShowTree(trees) {
  return (
    <div>
      {trees &&
        trees.map((tree, idx) => <ShowTreeData key={idx} tree={tree} />)}
    </div>
  );
}

export default MyTreePage;
