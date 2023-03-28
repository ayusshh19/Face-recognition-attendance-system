import React, { useState } from "react";
import "../style/register.css";
import registration from "../assets/user-registration.png";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../apiroutes/apiroutes";
import axios from "axios";
export default function Register({userclick}) {
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (handlevalidation()) {
      // setload(!loading)
      const {
        username,
        firstname,
        rollno,
        class_in,
        lastname,
        email,
        phone_number,
        Institute,
        current_sem,
      } = values;
      const { data } = await axios.post(register, {
        username,
        firstname,
        rollno,
        class_in,
        lastname,
        email,
        phone_number,
        Institute,
        current_sem,
      });
      console.log(data)
      userclick()
      console.log('yeh kaya hai')
      // setload(!loading)
      if(data.status==400){

        toast.error(data.data.msg)
      }else{
        toast.success(data.msg,toastobj)
        
      }
    }
    else{
      // setload(!loading)
      toast.error('some thing went wrong')
    }
  };
  console.log('yeh nash kaya hai')
  const toastobj = {
    position: "top-center",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handlechange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };
  const handlevalidation = () => {
    const { firstname, lastname, email } = values;
    if (firstname.length < 3 || lastname.length < 3) {
      toast.error("Enter Valid name of length greater than 3!!!", toastobj);
      return false;
    } else if (email === "") {
      toast.error("Email is required !!!", toastobj);
      return false;
    }
    return true;
  };
  const [values, setvalues] = useState({
    firstname: "",
    username: "",
    class_in: "B",
    rollno: "",
    phone_number: "",
    lastname: "",
    email: "",
    Institute: "",
    current_sem: "",
  });

  return (
    <div className="outter_div1">
      <div className="register">
        <div className="imagereg">
          <img src={registration} alt="reg"></img>
        </div>
        <div className="form">
          <div className="fullname">
          <input
            className="fname"
            name="firstname"
            type="text"
            placeholder="Firstname"
            onChange={(e) => handlechange(e)}
          ></input>
          <input
            className="lname"
            name="lastname"
            type="text"
            placeholder="Lastname"
            onChange={(e) => handlechange(e)}
          ></input>
          </div>
          <input
            className="fname"
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) => handlechange(e)}
          ></input>
          <input
            className="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handlechange(e)}
          ></input>
          <div className="rollclass">
          <input
            type="number"
            name="rollno"
            placeholder="Roll no"
            onChange={(e) => handlechange(e)}
          ></input>
          <select name="class_in" onChange={(e) => handlechange(e)}>
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
            <option value={"C"}>C</option>
          </select>
          </div>
          <div className="semphone">
          <select name="current_sem" onChange={(e) => handlechange(e)}>
            <option>Sem</option>
            <option>5</option>
            <option>6l</option>
          </select>
          <input
            type="number"
            name="phone_number"
            placeholder="Phone No"
            onChange={(e) => handlechange(e)}
          ></input>
          </div>
          <input
            className="ins"
            name="Institute"
            type="text"
            placeholder="Institute"
            onChange={(e) => handlechange(e)}
          ></input>
          <button className="submit" onClick={(e) => handlesubmit(e)}>
            Sign Up
          </button>
        </div>
      </div>
      <svg class="arrows">
        <path class="a1" d="M0 0 L30 32 L60 0"></path>
        <path class="a2" d="M0 20 L30 52 L60 20"></path>
        <path class="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>

    </div>
  );
}
