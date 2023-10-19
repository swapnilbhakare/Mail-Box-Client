import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesheet from "./Sent.module.css";
import { setSelectedEmail } from "../../../Store/emails-slice";
import { ListGroup, Row, Col, Container, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import useSentEmailOperations from "./useSentEmailOperations"; // Correct import path
const Sent = () => {
  const { deleteSentEmail } = useSentEmailOperations(); // Use the custom hook
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const recipientEmail = useSelector((state) => state.authentication.userId);
  const history = useHistory();

  // State to represent loading state

  const handleEmailClick = (email) => {
    // Construct the correct URL path for MessageDetail
    const emailSource = "sent"; // You may need to get the actual source from your email object
    history.push(`/message/${emailSource}/${email.id}`);
  };

  const handleDeleteEmail = (email) => {
    // Handle the deletion of emails here, if needed
    console.log(email);
    deleteSentEmail(email.id);
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedEmail(null)); // Clear the selected email when unmounting
    };
  }, [dispatch]);

  if (!recipientEmail) {
    return <p>Loading emails...</p>;
  }

  const formatToShortDate = (dateString) => {
    const options = { day: "2-digit", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter emails that were sent by you
  const sentEmails = emails.filter(
    (email) => email.data.sender === recipientEmail
  );

  return (
    <Container>
      <h2>Sent</h2>
      <ListGroup>
        {sentEmails.map((email) => (
          <Form.Check
            key={email.id}
            aria-label={email.id}
            type="checkbox"
            inline
          >
            <ListGroup.Item
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleEmailClick(email)}
            >
              <Row className={stylesheet["emails"]}>
                <Col xs={8} sm={9} md={9} lg={10} xl={10}>
                  <Link
                    to={`/email/${email.id}`}
                    className={stylesheet["email"]}
                  >
                    <Col className="d-block d-sm-inline-block">
                      <span className="d-block d-sm-inline-block">
                        {email.data.to} {/* Display recipient email address */}
                      </span>
                    </Col>
                    <Col
                      className={`d-block ${stylesheet["truncate-text"]} d-md-inline-block`}
                    >
                      {" - "}
                      {email.data.subject}
                    </Col>
                    <Col className={stylesheet["truncate-text"]}>
                      {formatToShortDate(email.data.date)}
                    </Col>
                  </Link>
                </Col>
                <Col xs={4} sm={3} md={3} lg={2} xl={2} className="text-right">
                  <Button
                    className={stylesheet["delete-btn"]}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the email click event
                      handleDeleteEmail(email);
                    }}
                  >
                    <AiOutlineDelete />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </Form.Check>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Sent;
