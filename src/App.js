import './App.css';
import {
  BrowserRouter as Router,
  
  Route, Routes
 
} from "react-router-dom";
import Navbar from './Components/NavBar';
import  Home  from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
    
      <Router>
        <Navbar/> 
        <Alert message="hey this is me"/>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;