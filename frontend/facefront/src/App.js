import React, { useEffect } from "react";
import Home from "./pages/Home";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from "react";
import Nav from './components/Nav'
import Register from "./components/Register";

function App() {
  useEffect(()=>{

    AOS.init({
      duration: 1500, // values from 0 to 3000, with step 50ms
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
