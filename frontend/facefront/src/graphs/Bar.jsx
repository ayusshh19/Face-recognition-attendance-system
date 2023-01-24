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
    SE: 0,
    IP: 0,
    CN: 0,
    DWM: 0,
  };

  props.filterdata.map((data) => {
    subj[data.subject] += 1;
  });
  const [data, setData] = useState({
    labels: ["TCS", "SE", "IP", "CN", "DWM"],
    datasets: [
      {
        label: "Dataset 1",
        data: [subj["TCS"], subj["CN"], subj["SE"], subj["DWM"], subj["IP"]],
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
      <div className="studata">
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
      </div>
    </Barcomponent>
  );
};

const Barcomponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .bargraph {
    width: 50%;
  }
  .studata {
    width: 40%;
    height: 25rem;
    margin: 2rem;
    overflow-y: auto;
    color: white;
  }
  @media (max-width:950px) {
    flex-wrap: wrap;
    .studata{
      width: 100%;
      margin: 0.5rem;
      font-size: 0.7rem;
    }
    .bargraph{
      width: 100%;
    }
  }
`;
const Listcomp=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  /* background: linear-gradient(180deg, #373b44 0%, #4286f4 100%);
    backdrop-filter: blur(25px); */
`
const Listitembar=styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 99, 132, 0.2);
  border: 2px solid rgba(255, 99, 132, 1);
  width: 100%;
  height: 5rem;
  margin: 0.3rem;
  border-radius: 1rem;
  .studatas{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  
`
export default Horizontalchart;
