import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import stylesheet from "./MessageDetails.module.css";
import MessageTopBar from "../../Layout/MessageTopBar";
import { markEmailAsRead } from "../../../Store/emails-slice";
import { CgProfile } from "react-icons/cg";
import { Editor, EditorState, convertFromRaw } from "draft-js";

const MessageDetail = () => {
  const dispatch = useDispatch();
  const { id, source } = useParams();
  const emails = useSelector((state) => state.emails.emails);
  const selectedEmail = emails.find((email) => email.id === id);
  const history = useHistory();

  useEffect(() => {
    // Mark the email as read if it exists
    if (selectedEmail) {
      dispatch(markEmailAsRead(selectedEmail.id));
    }
  }, [dispatch, selectedEmail]);

  if (!selectedEmail) {
    return <p>Email not found.</p>;
  }

  const emailTimestamp = new Date(selectedEmail.data.timestamp);
  const currentTimestamp = new Date();
  const daysAgo = Math.floor(
    (currentTimestamp - emailTimestamp) / (1000 * 60 * 60 * 24)
  );
  const daysAgoText = isNaN(daysAgo) ? "Unknown" : `${daysAgo} days ago`;
  const messageContent = selectedEmail.data.message;
  const handleEmailClick = (email) => {
    if (source === "inbox") {
      history.push("/inbox");
    } else if (source === "sent") {
      history.push("/sent");
    } else {
      // Handle any other conditions or fallback behavior here
      // In this case, you might want to go to a default route
      history.push("/default");
    }
  };
  const renderMessageContent = (messageContent) => {
    try {
      const content = JSON.parse(messageContent);
      const contentState = convertFromRaw(content);
      const editorState = EditorState.createWithContent(contentState);

      return (
        <Editor
          editorState={editorState}
          readOnly={true} // Make the content read-only
        />
      );
    } catch (error) {
      console.error("Error parsing message content:", error);
      return <p>Error displaying message content.</p>;
    }
  };

  return (
    <Container>
      <MessageTopBar goBack={handleEmailClick} />

      <Card className={stylesheet["message-detail"]}>
        <Card.Header className={stylesheet.header}>
          <Card.Title className={stylesheet["message-subject"]}>
            {selectedEmail.data.subject}
          </Card.Title>
          <Container className="mt-4 d-flex justify-content-between align-items-center">
            <Card.Subtitle className="d-flex justify-content-around align-items-center">
              <CgProfile className={stylesheet["icon"]} />{" "}
              <span>{selectedEmail.data.sender}</span>
            </Card.Subtitle>
            <Card.Subtitle className={stylesheet["message-date"]}>
              {selectedEmail.data.date} ( {`${daysAgoText}`})
            </Card.Subtitle>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Text className={stylesheet["message-content"]}>
            {renderMessageContent(messageContent)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessageDetail;
