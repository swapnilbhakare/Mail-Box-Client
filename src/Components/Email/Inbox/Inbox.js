import React from "react";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const email = useSelector((state) => state.authentication.userId);
  const emailId = email || ""
  const senderId =  emailId.replace(/[^a-zA-Z0-9]/g, "");
 
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if (senderId) {
          const fetchUrl =`https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails.json?orderBy="to"&equalTo="${senderId}"`;
          const response = await fetch(fetchUrl);
          if (!response.ok) {
           
            throw new Error("Failed to fetch emails.");
          }
          const data = await response.json();
          if (data) {
            const emailList = Object.values(data);

            setEmails(emailList);
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
  }, [senderId]);

  return (
    <>
      <Container>
        <h2>Inbox</h2>
        <Link to="/compose">Compose</Link>

        {loading ? <p>Loading emails...</p> :
         <Row>
            {

                emails.map((email)=>{
                    console.log(email)
                })
            }
            
            </Row>}
      </Container>
    </>
  );
};

export default Inbox;
