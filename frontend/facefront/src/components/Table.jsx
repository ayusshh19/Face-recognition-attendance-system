import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
export default function (props) {
  const [sub, setsub] = useState("");
  const [fildat, setfilterdata] = useState([]);
  let labels = ["TCS", "SE", "IP", "CN", "DWM"];
  const getusers = props.filterdata.map((data) => {
    return data.username;
  });

  useEffect(() => {
    setfilterdata(
      props.filterdata.filter((attend) => {
        return attend.subject === sub;
      })
    );
    console.log(fildat);
    console.log(props.alluser)
  }, [sub]);
  return (
    <Tablecontainer>
      <table>
        <tr id="header">
        <th>ID</th>
          <th>Student Name</th>
          <th>Branch</th>
          <th>Roll no</th>
        </tr>
        {
        props.alluser.map((data) => {
            return getusers.find((e) => e === data.id) ? (
                <tr>
                    <td>
                  {data.id}{" "}
                </td>
                <td>
                  {data.firstname} {data.lastname}{" "}
                </td>
                <td>{data.class_in} </td>
                <td>{data.rollno} </td>
              </tr>
            ) : (
              ''
            )
                    })}

      </table>
    </Tablecontainer>
  );
}
const Tablecontainer = styled.div`
  table {
    margin: 2rem auto;
    border-collapse: collapse;
    width: 800px;
    height: 200px;
    border: 1px solid #bdc3c7;
    background-color: rgba(255, 99, 132, 0.2);
    color: white;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2),
      -1px -1px 8px rgba(0, 0, 0, 0.2);
  }

  tr {
    transition: all 0.2s ease-in;
    cursor: pointer;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  #header {
    background-color: rgba(255, 99, 132, 1);
    color: #fff;
  }

  h1 {
    font-weight: 600;
    text-align: center;
    background-color: rgba(255, 99, 132, 1);
    color: #fff;
    padding: 10px 0px;
  }

  tr:hover {
    background-color: #f5f5f5;
    transform: scale(1.02);
    color: black;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2),
      -1px -1px 8px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 768px) {
    table {
      width: 90%;
    }
  }
`;
