import React from "react";
import styled, { keyframes } from "styled-components";
export default function Textanimation() {
  return <Wrapper>Ayush shukla</Wrapper>;
}

const animation = keyframes`
    0%{
        opacity: 0;
        transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
        filter: blur(10px);
    }
    25%{
        opacity: 1;
        transform: translateY(0) skewX(0) skewY(0) rotateZ(0deg);
        filter: blur(0px);
    }
    50%{
        opacity: 1;
        transform: translateY(0) skewX(0) skewY(0) rotateZ(0deg);
        filter: blur(0px);
    }
    100%{
        opacity: 1;
        transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
        filter: blur(10px);
    }
`;
const Wrapper = styled.span`
  display: inline-block;
  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
`;
