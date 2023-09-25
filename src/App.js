import "./App.css";
import { useState } from "react";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { useSelector } from "react-redux";
import Inbox from "./Components/Email/Inbox/Inbox";
import Header from "./Components/Layout/Header";
import SideNav from "./Components/Layout/SideNav";
import ComposeEmail from "./Components/Email/Compose/ComposeEmail";
function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const [show, setShow] = useState(false);
  const handleComposeButton = () => {
    setShow(true);
  };

  return (
    <div className="App">
      {isLoggedIn && (
        <>
          <SideNav compose={handleComposeButton} />
          <ComposeEmail show={show} setShow={setShow} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Authentication />} />
        {isLoggedIn && (
          <>
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/home" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
