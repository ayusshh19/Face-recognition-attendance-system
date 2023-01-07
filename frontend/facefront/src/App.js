import React, { useEffect } from "react";
import Home from "./pages/Home";
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(()=>{

    AOS.init({
      duration: 3000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
    });
  },[])
  return (
    <>
      <h1>Routes!!</h1>
      <Home />
    </>
  );
}

export default App;
