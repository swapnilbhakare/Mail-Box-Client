import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchEmails,setSelectedEmail } from "../../../Store/emails-slice";
import { ListGroup, Row, Col, Container } from "react-bootstrap";
import MessageDetail from "./MessageDetail";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const loading = useSelector((state) => state.emails.loading);
  const error = useSelector((state) => state.emails.error);
  const recipientEmail = useSelector((state) => state.authentication.userId);
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  
  useEffect(() => {
    dispatch(fetchEmails(recipientEmail));
  }, [dispatch, recipientEmail]);

  if (loading) {
    return <p>Loading emails</p>;
  }

  const handleEmailClick = (email) => {

    dispatch(setSelectedEmail(email)); // Dispatch the selectEmail action

  };
  if(loading){
    return <p>Loading emails</p>
  }
  return (
    <>
      <Container>
        <h2>Inbox</h2>
        <ListGroup>
          {emails.map((email) => (
            <ListGroup.Item style={{cursor:"pointer"}} 
            key={email.id}
            onClick={()=>handleEmailClick(email)}
            >
              {email.data.isRead ? (
                <Row>
                <Col>{email.data.sender}</Col>
                 <Col>{email.data.subject}</Col>
                 <Col>{email.data.date}</Col>
               
             </Row>
              ) : (
                <Row>
                <Col style={{ fontWeight: "bolder" }}>
                  {email.data.sender}
                </Col>
                <Col style={{ fontWeight: "bolder" }}>{email.data.subject}</Col>
                 <Col style={{ fontWeight: "bolder" }}>{email.data.date}</Col>
              </Row>
                 
               
              )}
             
            </ListGroup.Item>
          ))}
        </ListGroup>

      </Container>
      {selectedEmail && <MessageDetail />}    </>
  );
};

export default Inbox;
