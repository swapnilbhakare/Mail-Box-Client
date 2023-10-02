import React from "react";
import { Button, Nav } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import stylesheet from "./MessageTopBar.module.css";
import { Link } from "react-router-dom";

const MessageTopBar = () => {
  return (
    <Nav className="sidebar">
      <Nav.Item>
        <Link to="/inbox">
          <BiArrowBack />
        </Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link to="/sent">Sent</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link to="/drafts">Drafts</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link to="/spam">Spam</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link to="/trash">Trash</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MessageTopBar;
