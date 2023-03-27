import React from "react";
import styled from "styled-components";

export default function Usercard({bgcard,logoimg,heading,styleclass,userclick}) {
  const Usercardcontainer = styled.div`
max-width: 450px;
margin: 1rem;
  .usercomponent {
    max-width: 400px;
    min-width: 400px;
    /* max-width: 400px; */
    background-image: url(${bgcard});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    height: 200px;
    border-radius: 1.5rem;
    margin: 1rem;
    z-index: 1;
    cursor: pointer;
  }
  .usercomponent:hover{
    transform: translateY(-20px);
  }
  .blurbg {
    position: absolute;
    top: 36%;
    background: linear-gradient(
      180deg,
      rgba(55, 59, 68, 0.3) 100%,
      rgba(66, 134, 244, 0.3) 100%
    );
    backdrop-filter: blur(25px);
    border-radius: 1.5rem;
    color: white;
    width: 100%;
    height: 64%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    text-align: center;
  }
  .blurbg h1 {
    text-transform: uppercase;
  }
  .logoimg1 {
    position: absolute;
    top: 25%;
    left: 45%;
    z-index: 999;
  }
  .logoimg1 img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }
  @media (max-width:950px) {
    .usercomponent{
      min-width: 350px;
    }
  }
  @media (max-width:350px) {
    .usercomponent{
      min-width: 300px;
    }
  }
`;
  return (
    <Usercardcontainer>
      <div className="usercomponent" data-aos={styleclass} onClick={userclick} >
        <div className="logoimg1">
          <img src={logoimg} alt="" srcset="" />
        </div>
        <div className="blurbg">
          <h1>{heading}</h1>
        </div>
      </div>
    </Usercardcontainer>
  );
  
}



