import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import fire from '../../firebase';


const Main = ({handleLogout}) => {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        fire.auth().onAuthStateChanged(loggedin => {
            if (loggedin !== null) {
                setAuthenticated(true);
            }
        })
      });

    return (
        <div>
        {
            authenticated ? (
                <div className="main">
                    <p>hello</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : null
        }
        </div>
        //   {/* <div class="container">
        //     <div
        //         class={`main-item  ${
        //           props.location.pathname === "/mytree" ? "active" : ""
        //         }`}
        //       >
        //         <Link class="main-link" to="/mytree">
        //           My Tree
        //         </Link>
        //     </div>
        //     <div
        //         class={`main-item  ${
        //           props.location.pathname === "/buytree" ? "active" : ""
        //         }`}
        //       >
        //         <Link class="main-link" to="/buytree">
        //           Buy a Tree
        //         </Link>
        //     </div>
        //     <div
        //         class={`main-item  ${
        //           props.location.pathname === "/planttree" ? "active" : ""
        //         }`}
        //       >
        //         <Link class="main-link" to="/planttree">
        //           Plant a Tree
        //         </Link>
        //     </div>
        //     <div
        //         class={`main-item  ${
        //           props.location.pathname === "/searchtree" ? "active" : ""
        //         }`}
        //       >
        //         <Link class="main-link" to="/searchtree">
        //           Search a Tree
        //         </Link>
        //     </div>
        //   </div> */}
      );
};

export default Main;
