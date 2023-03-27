import React from "react";
import styled from "styled-components";
import Home from "../assets/home2.gif";
import "../style/register.css";
import Textanimation from "./Textanimation";
import { Link } from "react-scroll";
function Gif() {
  return (
    <Outergif className="outter_div">
      <div className="gif">
        <Textanimation />
      </div>
      <Link to={'homecards'} smooth={true}>
        <svg class="arrows">
          <path class="a1" d="M0 0 L30 32 L60 0"></path>
          <path class="a2" d="M0 20 L30 52 L60 20"></path>
          <path class="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      </Link>
    </Outergif>
  );
}
const Outergif = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  .gif {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gif img {
    width: 40%;
    height: 80%;
  }
  @media (max-width: 950px) {
    .gif img {
      width: 100%;
    }
  }
`;
export default Gif;
