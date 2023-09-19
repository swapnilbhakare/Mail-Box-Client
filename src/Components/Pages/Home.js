import React ,{useState}from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import stylesheet from "./Home.module.css";
import ComposeEmail from "../Email/ComposeEmail";
import { Button } from "react-bootstrap";
const Home = () => {
  const [show,setShow]= useState(false)
  const handleComposeButton=()=>{
    setShow(true)

  }
  return (

    <>
    <ComposeEmail show={show} setShow={setShow}/> 
     <Button onClick={handleComposeButton}>Compose</Button>
    </>
  );
};

export default Home;
