import React from "react";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setEmails } from "../../../Store/emails-slice";
const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails);

  const [loading, setLoading] = useState(true);
  const userEmail = useSelector((state) => state.authentication.userId);
  const emailId = userEmail || "";
  const senderId = emailId.replace(/[^a-zA-Z0-9]/g, "");

  const fetchUrl = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails${senderId}.json`;
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if (senderId) {
          const response = await fetch(fetchUrl);

          if (!response.ok) {
            throw new Error("Failed to fetch emails.");
          }

          const data = await response.json();

          if (data) {
            const emailsWithIds = Object.keys(data).map((emailId) => ({
              id: emailId,
              data: data[emailId],
            }));
            dispatch(setEmails(emailsWithIds));
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);

        toast.error("Failed to fetch emails. Please try again later.", {
          position: "top-right",

          autoClose: 2000,

          hideProgressBar: false,

          closeOnClick: true,

          pauseOnHover: false,

          draggable: true,

          progress: undefined,
        });

        setLoading(false);
      }
    };

    fetchEmails();
  }, [dispatch]);

  return (
    <>
      <Container>
        <h2>Inbox</h2>

        {loading ? (
          <p>Loading emails...</p>
        ) : (
          <Row>
            {emails.map((email) => (
              <Card key={email.id}>
                <Card.Body>
                  <Card.Title>From: {email.data.sender}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    Subject: {email.data.subject}
                  </Card.Subtitle>
                  <Card.Text>Date: {email.data.date}</Card.Text>

                  <Card.Text>{email.data.message}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Inbox;
