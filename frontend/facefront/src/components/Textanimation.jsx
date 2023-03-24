import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useInterval from 'react-use'
export default function Textanimation() {
  const textsplitarray = "RECOGNITION".split("");
  const identification = "IDENTIFICATION".split("");
  const [item,setitem]=useState(textsplitarray)
  const [count,setcount]=useState(0)
  const [play,setplay]=useState(false)

  useInterval(()=>{
    setitem(textsplitarray)
    setcount(count+1)
    if(count===0){
        setcount(0)
        setitem(identification)
    }
  }
  ,play?6000:null)
  useEffect(()=>{
    const timer= setTimeout(() => {
        setitem(identification)
        setplay(true)
    }, 4000);
    return ()=>clearTimeout(timer)
  },[])
  return (
    <Wrapper>
      {textsplitarray.map((item, index) => {
        <span key={index}>{item}</span>;
      })}
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
  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
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
`;
