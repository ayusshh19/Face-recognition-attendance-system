import React, { useEffect } from "react";
import Home from "./pages/Home";
import Visual from "./pages/Visuals";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./pages/Page404";



function App() {
  useEffect(() => {

    AOS.init({
      duration: 1500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
    });
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="visual" element={<Visual />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
