import React from 'react'
import styled from 'styled-components'
import load from '../assets/image.gif'
export default function Loading() {
  return (
    <Loadingcomponent>
      <img src={load} alt="hey" srcset="" />
      <h1>Training data .... might take some time !!!!</h1>
    </Loadingcomponent>
  )
}

const Loadingcomponent=styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  img{
    width: 50%;
    height: 50%;
  }
`

