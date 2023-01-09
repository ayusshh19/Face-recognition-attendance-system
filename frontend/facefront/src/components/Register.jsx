import React, { useState } from 'react'
import '../style/register.css';
import registration from '../assets/user-registration.png';

export default function Register() {
  

  return (
    
    <div className='outter_div'>
    <div className='register'>
    <div className='image'>
      <img src={registration} alt='reg'></img>
      </div>
      <div className='form'>
     
      <input className='fname' type='text' placeholder='Firstname'></input>
      <input className='lname' type='text' placeholder='Lastname'></input>
      <input className='email' type='email' placeholder='Email'></input><br></br>
      <input  type='number' placeholder='Roll no'></input>
<select >
<option >Branch</option>
  <option >computer</option>
  <option >civil</option>
  <option >It</option>
  <option >chemical</option>
</select><br></br>
<select>
<option >Sem</option>
  <option >v</option>
  <option >vl</option>
</select>
      <input type='number' placeholder='Phone No'></input><br></br>
      <input className='ins' type='text' placeholder='Institute'></input>
      <button className='submit'>Sign Up</button>
      </div>
       </div>
       <svg class="arrows">
							<path class="a1" d="M0 0 L30 32 L60 0"></path>
							<path class="a2" d="M0 20 L30 52 L60 20"></path>
							<path class="a3" d="M0 40 L30 72 L60 40"></path>
						</svg>
    </div>
   
    
  )
}
