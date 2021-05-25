import React from 'react'
import "../../css/ErrorPage.css";

const ErrorPage = () => {
    return (
        <div>
            <div className="main-div">
                <h1 className="error-message">There are no trees here... </h1>
                <p className="error-message" id="error-description">
                    Please go to a valid page! You can press on the bottom nav bar to go back to
                    any of our pages!
                </p>
                <div id="panda"></div>
            </div>
        </div>
    )
}

export default ErrorPage
