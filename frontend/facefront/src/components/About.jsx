import React from "react";
import "../style/about.css";
import about from "../assets/about.png";

export default function About() {
  return (
    <>
      <h1>About</h1>
      <div className="outter_div2" id="about">
        <div className="about">
          <div className="para">
            <h4>
              FACE RECOGINITION ATTENDANCE SYSTEM IS ML BASED PROJECT USING DLIB
              LIBRARY AND ITS FACE-RECOGNITION MODULE AND OPENCV IS USED FOR
              IMAGE GETTING. IT PROVIDES APPROX 97.02% ACCURACY WITH EXCELLENT
              UI FOR VISUALISATION OF DATA.
            </h4>
          </div>
          <div className="image">
            <img src={about} alt="about"></img>
          </div>
        </div>
      </div>
    </>
  );
}
