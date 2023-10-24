import React, { useState } from "react";
import { Navbar, Form, Container, Button, Image, Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import profile from "../../images/profile.png";
import styleshhet from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../Store/auth-slice";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userId);
  const [showProfileModal, setShowProfileModal] = useState(false);
  console.log(user);
  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
    setShowProfileModal(false);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex">
          <Navbar.Brand href="#"> IlanoS</Navbar.Brand>
          <Navbar id="navbarScroll" className={styleshhet.navcontainer}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search mail"
                className={`${styleshhet["form-control"]} me-2`}
                aria-label="Search"
              />
              <Button variant="outline-info">
                <BsSearch />{" "}
              </Button>
            </Form>
            <Button
              className={styleshhet.profile}
              onClick={handleProfileClick}
              variant="none"
            >
              <Image src={profile} thumbnail />
            </Button>
          </Navbar>
        </Container>
      </Navbar>

      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column justify-content-center
 "
        >
          <p> {user ? user : "Guest"}</p>
          <Button
            className={styleshhet.profile}
            onClick={handleProfileClick}
            variant="none"
          >
            <Image src={profile} thumbnail />
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
