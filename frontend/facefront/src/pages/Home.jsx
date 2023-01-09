import React from 'react'
import styled from 'styled-components'
import Usercard from '../components/Usercard'
import card1bg from "../assets/cardsbg1.jpg";
import card2bg from "../assets/cardsbg2.jpeg";
import card3bg from "../assets/cardsbg3.jpeg";
import register from "../assets/register.png";
import train from "../assets/train.png";
import visual from "../assets/visual.png";
import Displaycard from '../components/Displaycard';
import users from '../assets/users.webp'
import attendance from '../assets/attendance.webp'
import Nav from '../components/Nav'
import Register from "../components/Register";
import About from "../components/About";
import Footer from '../components/Footer'
import Gif from '../components/Gif';


export default function Home() {

  return (
    <>
    <Nav/>
    <Gif/>
    {/* <Register/> */}
    <Homecontainer>
      <Usercard styleclass={"fade-right"} bgcard={card1bg} logoimg={register} heading={'REGISTER USER AND ADD DATASET'}/>
      <Usercard styleclass={"fade-down"} bgcard={card2bg} logoimg={train} heading={'TRAIN DATA'}/>
      <Usercard styleclass={"fade-left"} bgcard={card3bg} logoimg={visual} heading={'VISUALISE DATA'}/>
    </Homecontainer>
    <Displaycardhome>
      <Displaycard  styleclass={"fade-down"}
      userimg={users} heading1={'TOTAL COUNT'} count={'135'}/>
      <Displaycard  styleclass={"fade-down"}
      userimg={attendance} heading1={'TODAYS AVERAGE ATTENDANCE'} count={'78%'}/>
    </Displaycardhome>
    <About/>
    <Footer/>
    </>
  )
}

const Homecontainer=styled.div`
  width: 100%;
  position: relative;
  display: flex;
  /* display: flex; */
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
const Displaycardhome=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
