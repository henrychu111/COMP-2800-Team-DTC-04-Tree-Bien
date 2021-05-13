import React from 'react'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import '../css/main.css'


const DailyTips = () => {

    // firebase codes here for getting daily tips

    // access the database
    // get the random document from collection
    // assign this to a useState
    // const [dailytip, setdailytip] = useState('');

    // const getdailytip =() => {
    //     access the database
    //     get the random document
    //     setdailytip = the document string
    // }

    return (
        <Jumbotron fluid className="jumbotron">
            <Container>
                <h1>Daily Tips</h1>
                <p>
                    {/* This is where the dailytip will go */}
                    It's always a great idea to take short showers to save the water!
                </p>
            </Container>
        </Jumbotron>
    )
}

export default DailyTips
