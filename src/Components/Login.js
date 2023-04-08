import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();

       const [logindetails, setlogindetails] = useState({email: "" , password : ""});
    const onchange=(ele)=>{
        setlogindetails({...logindetails , [ele.target.name]: ele.target.value});
    }
    const OnSubmithandle = async (ele) => {
        ele.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
    
          },
          body: JSON.stringify({email : logindetails.email , password : logindetails.password})
        });

        const json = await response.json(); // Auth-token
        console.log(json);
         if(json.success){
        props.showAlert('Logged In Successfully' , 'success');
        setlogindetails({ email: "" , password : ""  });
        localStorage.setItem('token' , json.authtoken);
        navigate("/");}
        else{
          props.showAlert("Invalid Details" , 'danger'); 

        }
       
      }
  
  return (
    <div >
        <form className='container mt-1' onSubmit={OnSubmithandle}>
          <h2>Login to continue to NoteSaver</h2>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" onChange={onchange} value={logindetails.email} className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
  </div> 
   
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  onChange={onchange}   value={logindetails.password} name='password' className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary" onSubmit={OnSubmithandle}>Submit</button>
</form>

    </div>
  )
}
