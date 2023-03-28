import { useState} from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

  const Piechart =(props) => {
    let subj={
      "TCS":0, "SE":0, "IP":0, "CN":0, "DWM":0
  }
    props.filterdata.map((data)=>{
      subj[data.subject]+=1
      // setdatas({...datas,[data.subject]:datas[data.subject]+1})
    })
    const [data, setData] = useState({
        labels:["TCS","CN", "IP", "SE", "DWM"],
        datasets: [
          {
            label: 'Dataset 1',
            data:[subj["TCS"], subj.CN, subj.IP, subj["SE"], subj["DWM"],],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',

            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ]
          },
        ],
      });
    return(
        <Piecomponent>
            <Pie data={data} />
         </Piecomponent>)
}
const Piecomponent=styled.div`
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
export default Piechart;