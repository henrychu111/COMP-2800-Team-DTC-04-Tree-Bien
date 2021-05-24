import { useState, useEffect } from "react";
import AddTreeButton from "./AddTree";
import ShowTreeData from "./ShowTreeData";
import firebase from "../../firebase";

function MyTreePage({ loggedinUserMyTree }) {
  //if database has NO entry, return AddTree
  //else return ShowTree
  const [trees, setTrees] = useState([]);
  // const [treeID, setTreeID] = useState("");
  const db = firebase.firestore();

  const fetchDb = () => {
    db.collection("users")
      .doc(loggedinUserMyTree)
      .collection("add-new-tree")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((tree) => {
          setTrees([...trees, tree.data()]);
        });
      });
  };
  // const listenDb = () => {
  //   db.collection("users")
  //     .doc(loggedinUserMyTree)
  //     .collection("add-new-tree")
  //     .onSnapshot((snapshot) => {
  //       const treeList = [];
  //       snapshot.forEach((doc) => treeList.push({ ...doc.data() }));
  //       console.log("this is tree list");
  //       console.log(treeList);
  //       setTrees(treeList);
  //     });
  // };

  const listenDb = () => {
    db.collection("users")
      .doc(loggedinUserMyTree)
      .collection("add-new-tree")
      .onSnapshot((snapshot) => {
        const treeList = [];
        snapshot.forEach((doc) => {
          console.log("db snapshot");
          console.log(doc.data());
          const currentTreeID = doc.id;
          let treeObj = { ...doc.data(), ["id"]: currentTreeID };
          treeList.push(treeObj);
          console.log("this is tree list", treeList);
        });
        setTrees(treeList);

        // setTreeID(currentTreeID);
      });
  };

  // useEffect(fetchDb, []);

  useEffect(listenDb, []);

  // if (trees.length > 0) {
  //   return ShowTree(trees, loggedinUserMyTree);
  // } else {
  //   return AddTree(loggedinUserMyTree);
  // }
  // return AddTree(trees, loggedinUserMyTree, treeID);
  return AddTree(trees, loggedinUserMyTree);
}

function AddTree(trees, loggedinUserMyTree) {
  console.log("mytreepage user id", loggedinUserMyTree);
  console.log("Add tree num trees: ", trees.length);

  return (
    <div>
      <div>{trees.length}</div>
      <AddTreeButton
        existingTrees={trees}
        loggedinUser={loggedinUserMyTree}
        // treeID={treeID}
      />
    </div>
  );
}

// function ShowTree(trees, loggedinUserMyTree) {
//   return (
//     <div>
//       {trees &&
//         trees.map((tree, idx) => (
//           <ShowTreeData
//             loggedinUserData={loggedinUserMyTree}
//             key={idx}
//             tree={tree}
//           />
//         ))}
//     </div>
//   );
// }

export default MyTreePage;
