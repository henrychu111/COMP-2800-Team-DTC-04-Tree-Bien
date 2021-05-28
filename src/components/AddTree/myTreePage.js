import { useState, useEffect } from "react";
import AddTreeButton from "./AddTree";
import firebase from "../../firebase";

/**
 * Query database to complile a list of tree objects
 * @param {string} loggedinUserMyTree - logged in user Firestore document ID
 * @returns AddTree function with a list of tree object(s) and the logged in user Firestore document ID string passed into it
 */
function MyTreePage({ loggedinUserMyTree }) {
  const [trees, setTrees] = useState([]);
  const db = firebase.firestore();

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

/**
 * Return AddTreeButton component enclosed in div
 * @param {object} trees - list of tree(s) object
 * @param {string} loggedinUserMyTree - logged in user Firestore document ID
 * @returns divs enclosing AddTreeButton component with trees and loggedinUserMyTree params passed into it
 */
function AddTree(trees, loggedinUserMyTree) {
  return (
    <div>
      <AddTreeButton existingTrees={trees} loggedinUser={loggedinUserMyTree} />
    </div>
  );
}

export default MyTreePage;
