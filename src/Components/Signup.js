import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  let navigate = useNavigate();
  const [signupdetails, setsignupdetails] = useState({name:"", email: "" , password : "" ,cpassword:""});
    
    const onSubmitfnc= async (ele) => {
        ele.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
       
          },
          body: JSON.stringify({name : signupdetails.name ,email : signupdetails.email , password : signupdetails.password})
        });
        const json = await response.json(); // Auth-token
        console.log(json);
        // save the token in our history
        if(json.success){
        localStorage.setItem('token' , json.authtoken);
        props.showAlert('Account Created Successfully' , 'success');
        navigate("/");
        setsignupdetails({name:"", email: "" , password : ""  ,cpassword:"" });
        }
        else{
           props.showAlert("Invalid Credentials" , 'danger'); 
        }
       
      }
  const onchangefnc=(ele)=>{
    setsignupdetails({...signupdetails , [ele.target.name]: ele.target.value});

  }

  return (
    <div className='container mt-1'> 
    <h2 >Create an account to use NoteSaver</h2>
      <form onSubmit={onSubmitfnc}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  value={signupdetails.name}  name='name' onChange={onchangefnc} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email </label>
    <input type="email" className="form-control" id="email" value={signupdetails.email}  name='email' onChange={onchangefnc} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={signupdetails.password}  name='password' onChange={onchangefnc} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"   name='cpassword' onChange={onchangefnc} minLength={5} required/>
  </div>
  {/* value={signupdetails.password} */}
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
