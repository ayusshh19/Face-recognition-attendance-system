import React from "react";
import Facebook from "../assets/facebook.jpeg";
import Instagram from "../assets/instagram.webp";
import Github from "../assets/github.webp";
import Linkedin from "../assets/linkedin.webp";
import "../style/footer.css";

export default function Footer() {
  return (
    <>
      <div className="svg1">
        <div className="image1">
          <img className="face" src={Facebook} alt="facebook"></img>
          <img className="face1" src={Instagram} alt="facebook"></img>
          <img className="face2" src={Github} alt="facebook"></img>
          <img className="face3" src={Linkedin} alt="facebook"></img>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000b76"
            fill-opacity="1"
            d="M0,96L80,117.3C160,139,320,181,480,176C640,171,800,117,960,101.3C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}
