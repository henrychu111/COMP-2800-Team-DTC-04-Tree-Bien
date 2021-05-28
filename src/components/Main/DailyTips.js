import React, { useState, useEffect } from 'react'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import '../../css/Main.css';
import firebase from "../../firebase";


const DailyTips = () => {
    /**
     * @description Render daily tips jumbotron.
     */

    const [dailyTips, setDailyTips] = useState([]);
    const [randomTip, setRandomTip] = useState('');
    const [treeList, settreeList] = useState(["🌳", "🌲", "🌴", "🎋", "🍁", "🍂", "🌸"]);
    const [randomTree, setRandomTree] = useState('');
    const db = firebase.firestore();

    useEffect(() => {
        /**
         * @description Access tips document in Firebase collection, and put into array.
         */
        db.collection("tips")
        .where("random", "==", 1)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            setDailyTips(data);
        })
    }, [])

    useEffect(() => {
        /**
         * @description Choose a random tip from the array.
         */
        if (!dailyTips || dailyTips.length === 0) return;
        const chosenNumber = Math.floor(Math.random() * (dailyTips.length - 1));
        const chosenArray = dailyTips[chosenNumber];
        const chosenTip = chosenArray["tip"];
        setRandomTip(chosenTip);
    }, [dailyTips])

    useEffect(() => {
        /**
         * @description Choose a random emoji from array
         */
        if (!treeList || treeList.length === 0) return;
        const randomTreeNumber = Math.floor(Math.random() * (treeList.length - 1));
        const chosenTree = treeList[randomTreeNumber];
        setRandomTree(chosenTree);
    }, [treeList])

    return (
        <Jumbotron fluid className="jumbotron">
            <Container id="daily-tip-container">
                <h1>{randomTree} Daily Tip {randomTree}</h1>
                <p>
                    {randomTip}
                </p>
            </Container>
        </Jumbotron>
    )
}

export default DailyTips
