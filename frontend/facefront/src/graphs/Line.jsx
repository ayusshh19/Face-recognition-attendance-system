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
        labels:["TCS", "SE", "IP", "CN", "DWM"],
        datasets: [
          {
            label: 'Dataset 1',
            data:[subj['TCS'],subj['CN'],subj['SE'],subj['DWM'],subj['IP']],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    return(
        <Linecomponent  style={{width:'50%',height:"50%"}}>
            <Line data={data} options={options}/>
         </Linecomponent>)
}
const Linecomponent=styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
    height:50%;
   @media (max-width:950px) {
    width: 100% !important;
    height: 100% !important;
   }

`
export default Linechart;