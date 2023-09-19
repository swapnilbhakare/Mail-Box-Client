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
  const userEmail = useSelector((state) => state.authentication.userId);
  console.log(userEmail)
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if (userEmail) {
          const fetchUrl =`https://mail-box-client-8848b-default-rtdb.asia-southeast1.firebasedatabase.app/emails.json?orderBy="to"&equalTo="${userEmail}"`;
          const response = await fetch(fetchUrl);
          if (!response.ok) {
            console.log(response.status)
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
  }, [userEmail]);

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
