import "./App.css";
import { Button } from "react-bootstrap";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <div className="App">
      <Routes>
        
      <Route path="/" element={<Authentication />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
      </Routes>
    </div>
  );
}

export default App;
