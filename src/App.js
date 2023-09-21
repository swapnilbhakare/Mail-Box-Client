import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { useSelector } from "react-redux";
import Inbox from "./Components/Email/Inbox/Inbox";
import Header from "./Components/Layout/Header";
function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <div className="App">
      
      <Routes>
     
      <Route path="/" element={<Authentication />} />
        {isLoggedIn && 
        
        <>
     
        <Route path="/home" element={<Home />} />
        </>
        }
      </Routes>
    </div>
  );
}

export default App;
