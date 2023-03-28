import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInterval } from "react-use";
export default function Textanimation() {
  const textsplitarray = "RECOGNITION".split("");
  const identification = "IDENTIFICATION".split("");
  const [item, setitem] = useState(textsplitarray);
  const [count, setcount] = useState(0);
  const [play, setplay] = useState(false);

  useInterval(
    () => {
      setitem(identification);
      setcount(count + 1);
      console.log(count);
      if (count === 1) {
        setcount(0);
        setitem(textsplitarray);
      }
    },
    play ? 4000 : null
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setitem(textsplitarray);
      setplay(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Wrapper>
      <h1>
        FACE{" "}
        {item.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </h1>
      <h1>ATTENDANCE SYSTEM</h1>
    </Wrapper>
  );
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
  font-size: 3rem;
  span {
    display: inline-block;
    z-index: 10000;
    opacity: 0;
    color: #4286f4;
    /* color: linear-gradient(#373b44, #4286f4) !important; */
    animation-name: ${animation};
    animation-duration: 8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  @media (max-width: 1024px) {
	font-size: 1rem;
}
  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  span:nth-child(7) {
    animation-delay: 0.7s;
  }
  span:nth-child(8) {
    animation-delay: 0.8s;
  }
  span:nth-child(9) {
    animation-delay: 0.9s;
  }
  span:nth-child(10) {
    animation-delay: 0.10s;
  }
  span:nth-child(11) {
    animation-delay: 0.11s;
  }
  span:nth-child(12) {
    animation-delay: 0.12s;
  }
  span:nth-child(13) {
    animation-delay: 0.13s;
  }
  span:nth-child(14) {
    animation-delay: 0.14s;
  }
  span:nth-child(15) {
    animation-delay: 0.15s;
  }
  span:nth-child(16) {
    animation-delay: 0.16s;
  }
  span:nth-child(17) {
    animation-delay: 0.17s;
  }
  span:nth-child(18) {
    animation-delay: 0.18s;
  }
  span:nth-child(19) {
    animation-delay: 0.19s;
  }
  span:nth-child(20) {
    animation-delay: 0.20s;
  }
`;
