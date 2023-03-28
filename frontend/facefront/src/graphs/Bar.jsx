import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Horizontalchart = (props) => {
  const [sub, setsub] = useState("");
  const [fildat, setfilterdata] = useState([]);
  let labels = ["TCS", "CN", "IP", "SE", "DWM"];
  const getusers = props.filterdata.map((data) => {
    return data.username;
  });
  console.log(props.filterdata)
  useEffect(() => {
    setfilterdata(
      props.filterdata.filter((attend) => {
        return attend.subject === sub;
      })
    );
    console.log(fildat)
  }, [sub]);
  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
    onClick: function (evt, item) {
      setsub(labels[item[0].index]);
    },
  };
  let subj = {
    TCS: 0,
    IP: 0,
    CN: 0,
    SE: 0,
    DWM: 0,
  };

  props.filterdata.map((data) => {
    subj[data.subject] += 1;
    // console.log(subj)
  });
  const [data, setData] = useState({
    labels: ["TCS","CN", "IP", "SE", "DWM"],
    datasets: [
      {
        label: "Dataset 1",
        data: [subj["TCS"], subj.CN, subj.IP, subj["SE"], subj["DWM"],],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  });
  return (
    <Barcomponent>
      <div className="bargraph">
        <Bar data={data} options={options} />
      </div>
      {/* <div className="studata">
        <Listcomp>
        <h1 style={{color:'rgba(255, 99, 132, 1)'}}>Present students list</h1>
        {props.alluser.map((data) => {
          return sub===''?(getusers.find((e) => e === data.id) ? (
            <Listitembar>
              <div className="name">
              <h1>Name : {data.firstname} {data.lastname}</h1>
              </div>
              <div className="studatas">
              <h1>batch :{data.class_in}</h1>
              <h2>Roll no:{data.rollno}</h2>
              </div>
            </Listitembar>
          ) : (
            ''
          )):(fildat.find((e) =>{
           return e.username === data.id
          }) ? (
            <Listitembar>
              <div className="name">
              <h1>Name : {data.firstname} {data.lastname}</h1>
              </div>
              <div className="studatas">
              <h1>batch :{data.class_in}</h1>
              <h2>Roll no:{data.rollno}</h2>
              </div>
            </Listitembar>
          ) : (
            ''
          ))
        })}
        </Listcomp>
      </div> */}
    </Barcomponent>
  );
};

const Barcomponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30rem;
  border:2px solid rgb(53, 162, 235);
  .bargraph {
    width: 100%;
  }

  @media (max-width:950px) {
    flex-wrap: wrap;
    width: 80%;
    height: 20rem;
    .bargraph{
      width: 100%;
    }
  }
`;
export default Horizontalchart;
