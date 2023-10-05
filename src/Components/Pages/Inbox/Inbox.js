import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesheet from ".//Inbox.module.css";
import {
  setSelectedEmail,
  deleteEmail,
  markEmailAsRead,
} from "../../../Store/emails-slice";
import {
  fetchEmails,
  markEmailAsReadAction,
  deleteEmailAction,
} from "../../../Store/email-actions";
import { ListGroup, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
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
    dispatch(markEmailAsRead(email));
    dispatch(markEmailAsReadAction(email.id));
    dispatch(setSelectedEmail(email));
    history.push(`/email/${email.id}`); // Navigate to MessageDetail
  };

  const handleDeleteEmail = (email) => {
    dispatch(deleteEmailAction(email.id, emails));
    dispatch(deleteEmail(email.id, emails)); // Dispatch the deleteEmail action
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedEmail(null)); // Clear the selected email when unmounting
    };
  }, [dispatch]);

  if (loading || !emails) {
    return <p>Loading emails...</p>;
  }

  return (
    <>
      <Container>
        <h2>Inbox</h2>
        <ListGroup>
          {emails.map((email) => (
            <ListGroup.Item
              style={{
                cursor: "pointer",
                fontWeight: email.data && email.data.read ? "normal" : "bolder",
              }}
              key={email.id}
              onClick={() => handleEmailClick(email)}
            >
              <Row className={stylesheet["emails"]}>
                <Col style={{ flexGrow: 6 }}>
                  <Link
                    to={`/email/${email.id}`}
                    className={stylesheet["email"]}
                  >
                    <Col style={{ marginRight: "20px" }}>
                      {email.data.sender}
                    </Col>
                    <Col>{email.data.subject}</Col>
                    <Col>{email.data.date}</Col>
                  </Link>
                </Col>
                <Col style={{ flexGrow: 0 }}>
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
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Inbox;
