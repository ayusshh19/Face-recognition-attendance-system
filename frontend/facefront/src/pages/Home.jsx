import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Usercard from "../components/Usercard";
import card1bg from "../assets/cardsbg1.jpg";
import card2bg from "../assets/cardsbg2.jpeg";
import card3bg from "../assets/cardsbg3.jpeg";
import register from "../assets/register.png";
import train from "../assets/train.png";
import visual from "../assets/visual.png";
import Displaycard from "../components/Displaycard";
import users from "../assets/users.webp";
import attendance from "../assets/attendance.webp";
import Nav from "../components/Nav";
import About from "../components/About";
import Footer from "../components/Footer";
import Gif from "../components/Gif";
import Register from "../components/Register";
import Loading from "./Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { traindata } from "../apiroutes/apiroutes";
import Displaythree from "../components/Three";
export default function Home() {
  const toastobj = {
    position: "top-center",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [registertag, setregistertag] = useState(false);
  const [trainloading, settrainloading] = useState(false);
  const setregister = () => {
    setregistertag(!registertag);
  };
  const navigate = useNavigate();
  const tovisual = () => {
    navigate("/visual");
  };
  const traindatas = async () => {
    settrainloading(!trainloading);
    const data = await axios.get(traindata);
    console.log(data);
    if (data) {
      settrainloading(false);
      toast.success(data.data.msg, toastobj);
    }
  };
  return trainloading ? (
    <Loading />
  ) : (
    <>
      <Nav />
      {registertag ? <Register userclick={setregister} /> : <Gif />}
      <ToastContainer />
      <Homecontainer id="homecards">
        <div className="displaytree">
          <Displaythree />
        </div>
        <Usercard
          userclick={setregister}
          styleclass={"fade-right"}
          bgcard={card1bg}
          logoimg={register}
          heading={"REGISTER USER AND ADD DATASET"}
        />
        <Usercard
          userclick={traindatas}
          styleclass={"fade-down"}
          bgcard={card2bg}
          logoimg={train}
          heading={"TRAIN DATA"}
        />
        <Usercard
          userclick={tovisual}
          styleclass={"fade-left"}
          bgcard={card3bg}
          logoimg={visual}
          heading={"VISUALISE DATA"}
        />
      </Homecontainer>
      <Displaycardhome id="records">
        <Displaycard
          styleclass={"fade-down"}
          userimg={users}
          heading1={"TOTAL COUNT"}
          count={"135"}
        />
        <Displaycard
          styleclass={"fade-down"}
          userimg={attendance}
          heading1={"TODAYS AVERAGE ATTENDANCE"}
          count={"78%"}
        />
      </Displaycardhome>
      <About />
      <Footer />
    </>
  );
}

const Homecontainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  /* display: flex; */
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .displaytree {
    z-index: -100;
    background-color: aqua !important;
  }
`;
const Displaycardhome = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
