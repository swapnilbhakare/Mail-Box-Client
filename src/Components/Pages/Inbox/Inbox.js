import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesheet from "./Inbox.module.css";
import { setSelectedEmail } from "../../../Store/emails-slice";
import { ListGroup, Row, Col, Container, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import useEmailOperations from "./useEmailOperations";
const Inbox = () => {
  const { markEmailAsRead, deleteEmail } = useEmailOperations(); // Use the custom hook

  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const history = useHistory();
  const recipientEmail = useSelector((state) => state.authentication.userId);

  const handleEmailClick = (email) => {
    markEmailAsRead(email.id);
    dispatch(setSelectedEmail(email));
    const emailSource = "inbox";
    history.push(`/message/${emailSource}/${email.id}`);
  };

  const handleDeleteEmail = (email) => {
    deleteEmail(email.id);
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedEmail(null)); // Clear the selected email when unmounting
    };
  }, [dispatch]);

  if (!recipientEmail) {
    return <p>Please log in to see your emails.</p>;
  }

  // Filter emails for the inbox that are sent to the user (recipientEmail)
  const receivedEmails = emails.filter(
    (email) => email.data.to === recipientEmail
  );

  const formatToShortDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Get the day (1-31)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // Get the month abbreviation
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  };

  return (
    <Container>
      <h2>Inbox</h2>
      <ListGroup>
        {receivedEmails.map((email) => (
          <Form.Check
            aria-label={email.id}
            key={email.id} // Add this key
            type="checkbox"
            inline
          >
            <ListGroup.Item
              style={{
                cursor: "pointer",
                fontWeight: email.data && email.data.read ? "normal" : "bolder",
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
                        {email.data.to}
                      </span>
                    </Col>
                    <Col
                      className={`d-block ${stylesheet["truncate-text"]} d-md-inline-block`}
                    >
                      {email.data.subject}
                    </Col>
                    <Col className={stylesheet["truncate-text"]}>
                      {" "}
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

export default Inbox;
