import React from "react";
import { useEffect } from "react";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../../../Store/emails-slice";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const loading = useSelector((state) => state.emails.loading);


  const userEmail = useSelector((state) => state.authentication.userId);
  const emailId = userEmail || "";
  const senderId = emailId.replace(/[^a-zA-Z0-9]/g, "");

 
  useEffect(() => {

  
    dispatch(fetchEmails(senderId));
  }, [dispatch]);
 

  return (
    <>
      <h2>Inbox</h2>
      {
        loading?<p>Loading..</p>:(
          <ListGroup>
          {emails.map((email) => (
            <ListGroup.Item key={email.id}>
              <Row>
                <Col xs={4}>{email.data.sender}</Col>
                <Col xs={4}>{email.data.subject}</Col>
                <Col xs={4} className="text-end">
                  {email.data.date}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        )
      }
     
    </>
  );
};

export default Inbox;
