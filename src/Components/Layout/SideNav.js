import React from "react";
import stylesheet from './SideNav.module.css'
import { Nav, Button } from "react-bootstrap";
import {BsPencilSquare} from 'react-icons/bs'
const SideNav = ({compose}) => {
  return (
    <Nav
      className="col-md-2 d-md-block bg-light sidebar shadow-sm  bg-white m-2"
      style={{ height: "100vh"}}
      activeKey="/inbox"
    >
      <div className="position-sticky">
        <Nav.Item>
          <Button
            as="div"
            variant="white"
            onClick={compose}
            
            className={`${stylesheet['compose-btn']} shadow-sm  bg-white rounded `}
          >
            <BsPencilSquare/>
            Compose
          </Button>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/inbox">Inbox</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/sent">Sent</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/drafts">Drafts</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/spam">Spam</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/trash">Trash</Nav.Link>
        </Nav.Item>

        {/* Add more folders/labels as needed */}
      </div>
    </Nav>
  );
};

export default SideNav;
