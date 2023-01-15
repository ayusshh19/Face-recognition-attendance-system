import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import makeAnimated from "react-select/animated";
import Horizontalchart from "../graphs/Bar";
import Piechart from "../graphs/Pie";
import Linechart from "../graphs/Line";
import Polarchart from "../graphs/Polar";
import axios from "axios";
import {visual} from '../apiroutes/apiroutes.js'
import Loading from "./Loading";
const animatedComponents = makeAnimated();
export default function Visuals() {
  const subjectslist = ["TCS", "SE", "IP", "CN", "DWM"];
  const semlist = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [loading,setloading]=useState(true)
  // const userdata=JSON.parse(getuser['msg'].stu)
  const [subjects, setsubjects] = useState("");
  const [sem, setsem] = useState("");
  const [date, setdate] = useState("2023-01-05");
  const [alluser,setalluser]=useState([])
  const [attendance,setattendance] = useState([]);
  const [filterdata,setfilterdata]=useState([])
  // console.log(getuser.msg.attend)
  useEffect(()=>{
    async function getalldata(){
      const data=await axios.get(visual)
      setalluser(data.data.msg.stu)
      setattendance(data.data.msg.attend)
      setloading(false)
      console.log(alluser)
    }
    getalldata()
  },[date])
  const options = [
    subjectslist.map((data) => {
      return { value: data, label: data };
    }),
  ];
  const sems = [
    semlist.map((data) => {
      return { value: data, label: data };
    }),
  ];
  useEffect(() => {
    if(!loading){
      setfilterdata(attendance.filter((attend) => {
        return attend.todaysdate === date;
      }))
    }
  }, [attendance]);
  const MyComponent = () => (
    <>
      <Graphcomponent>
        <div className="subjects">
          <h2>select subject</h2>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={options[0]}
            components={animatedComponents}
            onChange={(e) => setsubjects(e.value)}
            value={options[0].filter(function (option) {
              return option.value === subjects;
            })}
          />
        </div>
        <div className="sems">
          <h2>select semester</h2>
          <Select
            className="basic-single"
            classNamePrefix="select"
            components={animatedComponents}
            onChange={(e) => setsem(e.value)}
            options={sems[0]}
            value={sems[0].filter(function (option) {
              return option.value === sem;
            })}
          />
        </div>
        <div className="date">
          <h2>select Date</h2>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={date}
            min="2023-01-01"
            max="2023-12-31"
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
      </Graphcomponent>
      <Horizontalchart filterdata={filterdata} alluser={alluser}/>
      <Piechart filterdata={filterdata} alluser={alluser}/>
      <Linechart filterdata={filterdata} alluser={alluser}/>
      <Polarchart filterdata={filterdata} alluser={alluser}/>
    </>
  );

  return (
    <>
    <h1>{loading}</h1>
      {loading?<Loading />:<MyComponent />}
    </>
  );
}

const Graphcomponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  > div {
    width: 90%;
    max-width: 400px;
    /* color: white; */
    text-align: center;
  }
  > div h2 {
    color: white;
  }
  .css-13cymwt-control {
    background: linear-gradient(180deg, #373b44 0%, #4286f4 100%);
    backdrop-filter: blur(25px);
    color: #4286f4;
  }
  .date input {
    width: 100%;
    padding: 0.5rem;
    margin: auto;
    background: linear-gradient(180deg, #373b44 0%, #4286f4 100%);
    backdrop-filter: blur(25px);
    color: white;
    border: 2px solid white;
  }
`;
