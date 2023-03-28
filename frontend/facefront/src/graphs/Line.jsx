import React from 'react';
import { useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };
  const Linechart =(props) => {
    let subj={
      "TCS":0, "SE":0, "IP":0, "CN":0, "DWM":0
  }
    console.log(props.filterdata[0])
    props.filterdata.map((data)=>{
      subj[data.subject]+=1
      // setdatas({...datas,[data.subject]:datas[data.subject]+1})
    })
    const [data, setData] = useState({
        labels:["TCS","CN", "IP", "SE", "DWM"],
        datasets: [
          {
            label: 'Dataset 1',
            data: [subj["TCS"], subj.CN, subj.IP, subj["SE"], subj["DWM"],],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    return(
        <Linecomponent >
            <Line data={data} options={options}/>
         </Linecomponent>)
}
const Linecomponent=styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
    width: 40%;
    height: 30rem;
    border:2px solid rgb(53, 162, 235);
   @media (max-width:950px) {
    width: 80%;
    height: 20rem;
   }

`
export default Linechart;