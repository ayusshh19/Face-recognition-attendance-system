import React, { useEffect } from "react";
import Home from "./pages/Home";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Visuals from "./pages/Visuals";
import Gif from "./components/Gif";



function App() {
  useEffect(()=>{

    AOS.init({
      duration: 1500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
    });
  },[])
  return (
    <>
      <Visuals />
      {/* <Home /> */}
      
      <Home />
    </>
  );
}

export default App;
