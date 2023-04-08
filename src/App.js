import './App.css';
import {
  BrowserRouter as Router,
  
  Route, Routes
 
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './Components/NavBar';
import  Home  from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message , type)=>{
    setalert({
      msg: message,
      type : type
    })
    setTimeout(() => {
      setalert(null);
    },2000);
  }

  return (
    <>
    
      <Router>
        <Navbar/> 
        <Alert alert={alert}/>
        <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />} />
        <Route exact path="/about" element={<About showAlert={showAlert}  />} />
        <Route exact path="/login" element={<Login showAlert={showAlert}  />} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}  />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;