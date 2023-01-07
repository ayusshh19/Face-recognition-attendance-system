import React from "react";
import styled from "styled-components";

export default function Displaycard({ userimg, heading1, count,styleclass }) {
  const Attendancecount = styled.div`
    .attendcount {
      display: flex;
      max-width: 500px;
      min-width: 450px;
      height: 200px;
      border-radius: 2rem;
      background: rgba(217, 217, 217, 0.2);
      margin: 1rem;
    }
    @media (max-width:950px) {
      .attendcount{
        min-width: 350px;
      }
      .countattendance h1 {
      font-size: 1rem;
    }
    }
    @media (max-width:350px) {
      .attendcount{
        min-width: 300px;
      }
    }
    .countattendance {
      width: 60%;
      background: linear-gradient(180deg, #373b44 0%, #4286f4 100%);
      backdrop-filter: blur(25px);
      border-radius: 2rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .countattendance h1 {
      font-size: 2rem;
    }
    .userpic {
      width: 40%;
    }
    .userpic img {
      width: 100%;
      height: 100%;
    }
  `;
  return (
    <Attendancecount>
      <div className="attendcount" data-aos={styleclass} >
        <div className="countattendance">
          <h1>
            {heading1}
            <br></br> {count}
          </h1>
        </div>
        <div className="userpic">
          <img src={userimg} alt="" srcset="" />
        </div>
      </div>
    </Attendancecount>
  );
}
