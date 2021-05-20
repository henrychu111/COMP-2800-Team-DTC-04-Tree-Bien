import React, { useState, useEffect } from 'react'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import '../../css/Main.css';
import firebase from "../../firebase";



const DailyTips = () => {

    const [dailyTips, setDailyTips] = useState([]);
    const [randomTip, setRandomTip] = useState('');
    const db = firebase.firestore();

    useEffect(() => {
        db.collection("tips")
        .where("random", "==", 1)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            setDailyTips(data);
        })
    }, [])

    useEffect(() => {
        if (!dailyTips || dailyTips.length === 0) return;
        const chosenNumber = Math.floor(Math.random() * (dailyTips.length - 1));
        console.log(dailyTips);
        const chosenArray = dailyTips[chosenNumber];
        const chosenTip = chosenArray["tip"];
        setRandomTip(chosenTip);
    }, [dailyTips])

    return (
        <Jumbotron fluid className="jumbotron">
            <Container>
                <h1>Daily Tip</h1>
                <p>
                    {randomTip}
                </p>
            </Container>
        </Jumbotron>
    )
}

export default DailyTips
