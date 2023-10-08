import React from "react";
import { Button, Nav } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { RiSpam2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { MdMoveToInbox } from "react-icons/md";
import stylesheet from "./MessageTopBar.module.css";
import { Link } from "react-router-dom";

const MessageTopBar = () => {
  return (
    <Nav className={`${stylesheet.topbar} sidebar`}>
      <Nav.Item as="div">
        <Link to="/inbox">
          <BiArrowBack className={stylesheet.icon} />
        </Link>
      </Nav.Item>
      <Nav.Item as="div">
        <Link to="">
          <MdMoveToInbox className={stylesheet.icon} />
        </Link>
      </Nav.Item>
      <Nav.Item as="div">
        <Link to="">
          <RiSpam2Line className={stylesheet.icon} />
        </Link>
      </Nav.Item>
      <Nav.Item as="div">
        <Link to="">
          <AiOutlineDelete className={stylesheet.icon} />
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default MessageTopBar;
