import React ,{useState}from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import stylesheet from "./Home.module.css";
import ComposeEmail from "../Email/Compose/ComposeEmail";
import Inbox from '../Email/Inbox/Inbox'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import SideNav from "../Layout/SideNav";
const Home = () => {
  const [show,setShow]= useState(false)
  const handleComposeButton=()=>{
    setShow(true)

  }
  return (

    <>

    <Header/>

    <SideNav compose={handleComposeButton}/>
    <ComposeEmail show={show} setShow={setShow}/> 
    <Inbox/>
    
    
    </>
  );
};

export default Home;
