import { useState, useEffect } from "react";
import AddTreeButton from "./AddTree";
import ShowTreeData from "./ShowTreeData";
import firebase from "../../firebase";

function MyTreePage({ loggedinUserMyTree }) {
  //if database has NO entry, return AddTree
  //else return ShowTree
  const [trees, setTrees] = useState([]);
  const db = firebase.firestore();

  // const fetchDb = () => {
  //   db.collection("users")
  //     .doc(loggedinUserMyTree)
  //     .collection("add-new-tree")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((tree) => {
  //         setTrees([...trees, tree.data()]);
  //       });
  //     });
  // };

  const listenDb = () => {
    db.collection("users")
      .doc(loggedinUserMyTree)
      .collection("add-new-tree")
      .onSnapshot((snapshot) => {
        const treeList = [];
        snapshot.forEach((doc) => {
          const currentTreeID = doc.id;
          let treeObj = { ...doc.data(), ["id"]: currentTreeID };
          treeList.push(treeObj);
        });
        setTrees(treeList);
      });
  };
  useEffect(listenDb, []);
  return AddTree(trees, loggedinUserMyTree);
}

function AddTree(trees, loggedinUserMyTree) {
  return (
    <div>
      <AddTreeButton existingTrees={trees} loggedinUser={loggedinUserMyTree} />
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
