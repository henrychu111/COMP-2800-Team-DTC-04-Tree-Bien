import React from "react";
import Paul from "./images/AvatarMaker_Paul.png";
import April from "./images/AvatarMaker_April.png";
import Hannah from "./images/AvatarMaker_Hannah.png";
import Henry from "./images/AvatarMaker_Henry.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./AboutUs.css";


const AboutUsPage = () => {
  return (
    <div id="about-us-div">
      <Jumbotron className="about-us-jumbo" fluid>
        <div className="about-us-culture">
          <h1>
            Tree Bien
          </h1>
          <div id="about-us-description">
            <p>
              Our team is passionate about the environment and believe that with our
              efforts, our society will be influenced to foster a better relationship
              with mother nature. At Tree Bien, we believe each of our different
              strengths can create an environment where each team member can ask,
              learn, and teach one another. Root for trees, as they are humanity’s
              lifeline.
            </p>
          </div>
        </div>
      </Jumbotron>

      <div id="founder-photo-container">
        <div className="people-picture" id="paul-info">
          <img src={Paul}></img>
          <p className="founders-name">Paul Yeon</p>
          <p className="founders-title">Product Manager</p>
        </div>
        <div className="people-picture" id="hannah-info">
          <img src={Hannah}></img>
          <p className="founders-name">Hannah Kim</p>
          <p className="founders-title">UX/UI Designer</p>
        </div>
        <div className="people-picture" id="henry-info">
          <img src={Henry}></img>
          <p className="founders-name">Henry Chu</p>
          <p className="founders-title">Lead Developer</p>
        </div>
        <div className="people-picture" id="april-info">
          <img src={April}></img>
          <p className="founders-name">April Cheng</p>
          <p className="founders-title" id="april-title">Developer</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
