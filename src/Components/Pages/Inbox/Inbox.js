import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesheet from "./Inbox.module.css";
import { setSelectedEmail } from "../../../Store/emails-slice";
import {
  fetchEmails,
  markEmailAsReadAction,
  deleteInboxEmailAction,
  fetchNewEmails,
} from "../../../Store/email-actions";
import { ListGroup, Row, Col, Container, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const history = useHistory();
  const recipientEmail = useSelector((state) => state.authentication.userId);

  // State to represent loading state

  const [loading, setLoading] = useState(true); // Initially set to true
  useEffect(() => {
    if (!recipientEmail) {
      setLoading(false);
    } else {
      setLoading(true);

      // Fetch emails when the component mounts
      dispatch(fetchEmails(recipientEmail))
        .then(() => {
          // The async operation has completed successfully
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching emails:", error);
          setLoading(false);
        });
    }
  }, [dispatch, recipientEmail]);

  useEffect(() => {
    // Fetch new emails every 2 seconds
    const intervalId = setInterval(() => {
      dispatch(fetchNewEmails(recipientEmail));
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, recipientEmail]);

  const handleEmailClick = (email) => {
    dispatch(markEmailAsReadAction(email.id));
    dispatch(setSelectedEmail(email));
    const emailSource = "inbox";
    history.push(`/message/${emailSource}/${email.id}`);
  };

  const handleDeleteEmail = (email) => {
    try {
      dispatch(deleteInboxEmailAction(email.id, email));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedEmail(null)); // Clear the selected email when unmounting
    };
  }, [dispatch]);

  if (loading || !emails) {
    return <p>Loading emails...</p>;
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
