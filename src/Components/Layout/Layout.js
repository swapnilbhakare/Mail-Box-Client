import React, { useState } from "react";
import SideNav from "./SideNav";
import ComposeEmail from "../Email/Compose/ComposeEmail";
import Header from "./Header";
import { Container } from "react-bootstrap";
const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleComposeButton = () => {
    setShow(true);
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex">
        <SideNav compose={handleComposeButton} />
        <ComposeEmail show={show} setShow={setShow} />

        {children}
      </Container>
    </>
  );
};

export default Layout;
