import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import stylesheet from "./MessageDetails.module.css";
import MessageTopBar from "../../Layout/MessageTopBar";
import { markEmailAsRead } from "../../../Store/emails-slice";

const MessageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const emails = useSelector((state) => state.emails.emails);
  const selectedEmail = emails.find((email) => email.id === id);

  useEffect(() => {
    // Mark the email as read if it exists
    if (selectedEmail) {
      dispatch(markEmailAsRead(selectedEmail.id));
    }
  }, [dispatch, selectedEmail]);

  if (!selectedEmail) {
    return <p>Email not found.</p>;
  }

  const messageContent = selectedEmail.data.message;

  return (
    <Container>
      <MessageTopBar />
      <Card className={stylesheet["message-detail"]}>
        <Card.Body>
          <Card.Title className={stylesheet["message-subject"]}>
            {selectedEmail.data.subject}
          </Card.Title>
          <Card.Subtitle className={stylesheet["message-sender"]}>
            From: {selectedEmail.data.sender}
          </Card.Subtitle>
          <Card.Subtitle className={stylesheet["message-date"]}>
            Date: {selectedEmail.data.date}
          </Card.Subtitle>
          <Card.Text className={stylesheet["message-content"]}>
            {messageContent}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessageDetail;
