import React  from 'react'
import '../style/nav.css'
import DehazeIcon from '@mui/icons-material/Dehaze';


function Nav() {
  
  return (
    <header>
    <h1>DMCE</h1>
    <nav >
   <a href='/#'>HOME</a>
   <a href='/#'>ABOUT</a>
   <a href='/#'>RECORDS</a>
   <a href='/#'>VISUALS</a>
   </nav>
   <button className='dash'>DASHBOARD</button>
   </header>
  )
}

export default Nav

