import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import makeAnimated from "react-select/animated";
import Horizontalchart from "../graphs/Bar";
import Piechart from "../graphs/Pie";
import Linechart from "../graphs/Line";
import Polarchart from "../graphs/Polar";
import axios from "axios";
import { visual ,excel} from "../apiroutes/apiroutes.js";
import Loading from "./Loading";
import CustomPaginationActionsTable from "../components/Table";
const animatedComponents = makeAnimated();
export default function Visuals() {
  const subjectslist = ["TCS", "SE", "IP", "CN", "DWM"];
  const semlist = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [loading, setloading] = useState(true);
  // const userdata=JSON.parse(getuser['msg'].stu)
  const [subjects, setsubjects] = useState("");
  const [sem, setsem] = useState("");
  const [date, setdate] = useState("2023-03-28");
  const [alluser, setalluser] = useState([]);
  const [attendance, setattendance] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  // console.log(getuser.msg.attend)
  const  GetMineType =(extension)=>{
    switch (extension.toLowerCase())
    {
        
        case "csv": return "text/csv";
        case "cur": return "application/octet-stream";
        case "cxx": return "text/plain";
        case "dat": return "application/octet-stream";
        case "datasource": return "application/xml";
        case "dbproj": return "text/plain";
        case "dcr": return "application/x-director";
       case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "dot": return "application/msword";
        case "jpb": return "application/octet-stream";
        case "jpe": return "image/jpeg";
        case "jpeg": return "image/jpeg";
        case "jpg": return "image/jpeg";
        //etc ......
        
      }
}
  function downloadBlob(blob, filename,ext) {
    // Create an object URL for the blob object
    console.info(GetMineType(ext));
    const url = URL.createObjectURL(new Blob([blob],{type: `${GetMineType(ext)}`}));
  
    // Create a new anchor element
    const a = document.createElement('a');
  
    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href = url;
    a.download = filename || 'download';
  
    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    a.click();
  }
  useEffect(() => {
    async function getalldata() {
      const data = await axios.get(visual);
      setalluser(data.data.msg.stu);
      setattendance(data.data.msg.attend);
      setloading(false);
      console.log(alluser);
    }
    getalldata();
  }, [date]);
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
    // console.log(attendance);
    if (!loading) {
      setfilterdata(
        attendance.filter((attend) => {
          return attend.todaysdate === date && attend.present;
        })
      );
    }
  }, [attendance]);
  const getexcel=()=>{
    fetch(excel)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        // this.setState({ downloadUrl: url });
        const link = document.createElement('a');
        // console.log(link)
        link.href = url;
        link.setAttribute('download', 'file.xlsx');
        link.setAttribute('target', '_blank');
        link.setAttribute('type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.log(error));
  }
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
          <h2>Download Excel</h2>
          <Excelbutton onClick={getexcel}>
            <button>Excel data</button>
          </Excelbutton>
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
      <CustomPaginationActionsTable filterdata={filterdata} alluser={alluser} />
      <Graphcomponents>
        <Horizontalchart filterdata={filterdata} alluser={alluser} />
        <Piechart filterdata={filterdata} alluser={alluser} />
        <Linechart filterdata={filterdata} alluser={alluser} />
        <Polarchart filterdata={filterdata} alluser={alluser} />
      </Graphcomponents>
    </>
  );

  return (
    <>
      <h1>{loading}</h1>
      {loading ? <Loading /> : <MyComponent />}
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
const Excelbutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  /* background-color: white; */
  button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #373b44 0%, #4286f4 100%);
    border: 1px solid #892020;
    border-radius: 10px;
  }
`;
const Graphcomponents=styled.div`
      display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
`