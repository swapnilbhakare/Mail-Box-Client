import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../../../Store/emails-slice";
import { ListGroup,Row,Col, Container } from "react-bootstrap";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const loading = useSelector((state) => state.emails.loading);
  const error = useSelector((state) => state.emails.error);
  const recipientEmail = useSelector((state) => state.authentication.userId);

  useEffect(() => {
    dispatch(fetchEmails(recipientEmail));
  }, [dispatch, recipientEmail]);

  if (loading) {
    return <p>Loading emails</p>;
  }

  return (
    <>
      <Container>
        <h2>Inbox</h2>
        <ListGroup>
          {emails.map((email) => (
            <ListGroup.Item key={email.id}>
              <Row>
                <Col>{email.data.sender}</Col>
                <Col>{email.data.subject}</Col>
                <Col>{email.data.date}</Col>


              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Inbox;
