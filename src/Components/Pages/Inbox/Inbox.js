import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedEmail,
  markEmailAsRead as markEmailAsReadAction,
} from "../../../Store/emails-slice";
import { fetchEmails } from "../../../Store/email-actions";
import { ListGroup, Row, Col, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const history = useHistory();

  // State to represent loading state
  const [loading, setLoading] = useState(true); // Initially set to true

  const recipientEmail = useSelector((state) => state.authentication.userId);

  useEffect(() => {
    if (!recipientEmail) {
      setLoading(false);
    } else {
      setLoading(true);

      // Fetch emails
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

  const handleEmailClick = (email) => {
    dispatch(markEmailAsReadAction(email));
    dispatch(setSelectedEmail(email));
    history.push(`/email/${email.id}`); // Navigate to MessageDetail
  };

  // Add this effect to clear the selected email when leaving the MessageDetail
  useEffect(() => {
    return () => {
      dispatch(setSelectedEmail(null)); // Clear the selected email when unmounting
    };
  }, [dispatch]);

  if (loading) {
    return <p>Loading emails...</p>;
  }

  return (
    <>
      <Container>
        <h2>Inbox</h2>

        <ListGroup>
          {emails.map((email) => (
            <Link to={`/email/${email.id}`} key={email.id}>
              <ListGroup.Item
                style={{
                  cursor: "pointer",
                  fontWeight: email.data.read ? "normal" : "bolder",
                }}
                key={email.id}
                onClick={() => handleEmailClick(email)}
              >
                <Row>
                  <Col>{email.data.sender}</Col>
                  <Col>{email.data.subject}</Col>
                  <Col>{email.data.date}</Col>
                </Row>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Inbox;
