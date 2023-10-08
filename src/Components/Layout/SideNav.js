import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import stylesheet from "./SideNav.module.css";
import { Nav, Button } from "react-bootstrap";
import { BsPencilSquare, BsInboxes, BsFillSendFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { markEmailAsRead } from "../../Store/emails-slice";

const SideNav = ({ compose }) => {
  // Get the unread email count from the Redux store
  const unreadEmailCount = useSelector((state) => {
    const emails = state.emails.emails;
    const recipientEmail = state.authentication.userId;
    return emails.filter(
      (email) => email.data.to === recipientEmail && !email.data.read
    ).length;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to count unread emails when the component mounts
    dispatch(markEmailAsRead()); // Dispatch an action that updates the unread count
  }, [dispatch]);

  return (
    <Nav
      className={`${stylesheet.nav}  d-flex justify-content-start col-md-2 sidebar shadow-sm`}
      style={{ height: "80vh", backgroundColor: "whitesmoke" }}
      activeKey="/inbox"
    >
      <div className="position-sticky mt-2">
        <Nav.Item>
          <Button
            as="div"
            onClick={compose}
            variant="white"
            className={`${stylesheet["compose-btn"]} shadow-sm  bg-white rounded `}
          >
            <BsPencilSquare />
            Compose
          </Button>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/inbox"
            activeClassName={stylesheet["active-link"]} // Apply this class for the active link
          >
            <BsInboxes />
            Inbox
            <span className="badge badge-primary">{unreadEmailCount}</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/sent"
            activeClassName={stylesheet["active-link"]} // Apply this class for the active link
          >
            <span>
              <BsFillSendFill />
              Sent
            </span>
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideNav;
