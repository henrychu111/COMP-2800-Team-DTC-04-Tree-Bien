import React, { useState, useEffect } from 'react';
import Paul from "./images/AvatarMaker_Paul.png";
import April from "./images/AvatarMaker_April.png";
import Hannah from "./images/AvatarMaker_Hannah.png";
import Henry from "./images/AvatarMaker_Henry.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import Chris from "./images/AvatarMaker_Chris.png";
import Patrick from "./images/AvatarMaker_Patrick.png";
import Shachi from "./images/AvatarMaker_Shachi.png";
import Hoda from "./images/AvatarMaker_Hoda.png";
import { useDoubleTap } from 'use-double-tap';

import "./AboutUs.css";


const AboutUsPage = () => {
 
  const [paulphoto, setPaul] = useState(true);
  const [hannahphoto, setHannah] = useState(true);
  const [henryphoto, setHenry] = useState(true);
  const [aprilphoto, setApril] = useState(true);


  const doubleTapHenry = useDoubleTap((event) => {
    setHenry(!henryphoto)
  });

  const doubleTapPaul = useDoubleTap((event) => {
    setPaul(!paulphoto)
  });

  const doubleTapApril = useDoubleTap((event) => {
    setApril(!aprilphoto)
  });

  const doubleTapHannah = useDoubleTap((event) => {
    setHannah(!hannahphoto)
  });

  return (
    <div id="about-us-div">
      <Jumbotron className="about-us-jumbo" fluid>
        <div className="about-us-culture">
          <h1>
            Tree Bien <br></br>
            {!paulphoto && !hannahphoto && !henryphoto && !aprilphoto ? ("Super Team") : null}
          </h1>
          <div id="about-us-description">
            <p>
              {!paulphoto && !hannahphoto && !henryphoto && !aprilphoto ? 
              ("These are the supervisors that guided us to our success! Thank you to each and every one of you! " + 
              "From your favourite students!") 
              : ("Our team is passionate about the environment and believe that with our efforts, " + 
                "our society will be influenced to foster a better relationship with mother nature." + 
                " At Tree Bien, we believe each of our different strengths can create an environment where " + 
                "each team member can ask, learn, and teach one another. Root for trees, as they are humanity’s lifeline.")}
            </p>
          </div>
        </div>
      </Jumbotron>

      <div id="founder-photo-container">
        <div className="people-picture" id="paul-info">
          <img 
          src={paulphoto ? Paul : Chris} 
          {...doubleTapPaul}
          />
          <p className="founders-name">{paulphoto ? ("Paul Yeon") : ("Chris Thompson")}</p>
          <p className="founders-title">{paulphoto ? ("Product Manager") : ("DTC Project Lead Instructor")}</p>
        </div>
        <div className="people-picture" id="hannah-info">
          <img
          src={hannahphoto ? Hannah : Patrick} 
          {...doubleTapHannah}
          />
          <p className="founders-name">{hannahphoto ? ("Hannah Kim") : ("Patrick Guichon")}</p>
          <p className="founders-title">{hannahphoto ? ("UX/UI Designer") : ("Project Team Supervisor")}</p>
        </div>
        <div className="people-picture" id="henry-info">
          <img style={{cursor:'pointer'}}
          src={henryphoto ? Henry : Shachi} 
          {...doubleTapHenry}
          />
          <p className="founders-name">{henryphoto ? ("Henry Chu") : ("Shachi Singh")}</p>
          <p className="founders-title">{henryphoto ? ("Lead Developer") : ("Project Team Supervisor")}</p>
        </div>
        <div className="people-picture" id="april-info">
          <img
          src={aprilphoto ? April : Hoda}
          {...doubleTapApril}
          />
          <p className="founders-name">{aprilphoto ? ("April Cheng") : ("Hoda Rashedi")}</p>
          <p className="founders-title" id="april-title">{aprilphoto ? ("Developer") : ("Project Team Supervisor")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
