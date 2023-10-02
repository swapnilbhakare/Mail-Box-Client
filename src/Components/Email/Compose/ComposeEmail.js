import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  setTo,
  setCC,
  setBCC,
  setSubject,
  setMessage,
  resetCompose,
} from "../../../Store/compose-slice";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Button, Form, Row, Col, Modal, InputGroup } from "react-bootstrap";
import stylesheet from "./ComposeEmail.module.css";
import { useDispatch, useSelector } from "react-redux";

const ComposeEmail = (props) => {
  const dispatch = useDispatch();
  const compose = useSelector((state) => state.compose);
  const [showCC, setShowCC] = useState(!!compose.cc);

  const [showBCC, setShowBCC] = useState(!!compose.bcc);

  const handleClose = () => {
    dispatch(resetCompose());
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (compose.message) {
      try {
        const parsedMessage = JSON.parse(compose.message);
        if (typeof parsedMessage === "object" && parsedMessage !== null) {
          const contentState = convertFromRaw(parsedMessage);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        } else {
          console.error("Invalid JSON:", compose.message);
        }
      } catch (error) {
        console.error("Error parsing compose.message:", error);
        console.error("Invalid JSON:", compose.message);
      }
    } else {
      // Handle the case when compose.message is null or undefined
      console.error("compose.message is null or undefined");
    }
  }, [compose.message]);

  const onEditorStateChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const messageText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n"); // Join text with line breaks
    setEditorState(newEditorState);
    dispatch(setMessage(messageText));
  };

  const userEmail = useSelector((state) => state.authentication.userId);

  const emailId = userEmail || "";
  const senderId = emailId.replace(/[^a-zA-Z0-9]/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    const emailData = {
      to: compose.to,
      cc: compose.cc,
      bcc: compose.bcc,
      subject: compose.subject,
      message: compose.message,
      sender: userEmail,
      date: currentDate,
      read: false,
    };

    try {
      // Make a POST request to your server with email data
      const response = await axios.post(
        `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${senderId}.json`,
        emailData
      );

      if (response.status === 200) {
        console.log("Email sent successfully");
        toast.success("Email sent successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    props.setShow(false);
    handleClose();
  };

  return (
    <>
      {/* compose Modal */}
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3 ">
              <InputGroup.Text className="shadow-none border-0 border-bottom rounded-0">
                To
              </InputGroup.Text>
              <Form.Control
                type="email"
                value={compose.to}
                onChange={(e) => dispatch(setTo(e.target.value))}
                required
                className="shadow-none border-0 border-bottom rounded-0"
                aria-label="To"
                placeholder="Recipients"
              />
              <Row>
                <Col>
                  <Button
                    variant="link"
                    onClick={() => setShowCC(!showCC)}
                    className="mb-2"
                  >
                    {showCC ? "Hide CC" : "CC"}
                  </Button>
                </Col>

                <Col>
                  <Button
                    variant="link"
                    onClick={() => setShowBCC(!showBCC)}
                    className="mb-2"
                  >
                    {showBCC ? "Hide BCC" : "BCC"}
                  </Button>
                </Col>
              </Row>
            </InputGroup>

            {showCC && (
              <InputGroup className="mb-3 ">
                <InputGroup.Text className="shadow-none border-0 border-bottom rounded-0">
                  CC
                </InputGroup.Text>

                <Form.Control
                  type="email"
                  onChange={(e) => dispatch(setCC(e.target.value))}
                  className="shadow-none border-0 border-bottom rounded-0"
                  aria-label="To"
                  placeholder="Recipients"
                  value={compose.cc}
                />
              </InputGroup>
            )}
            {showBCC && (
              <InputGroup className="mb-3 ">
                <InputGroup.Text className="shadow-none border-0 border-bottom rounded-0">
                  BCC
                </InputGroup.Text>

                <Form.Control
                  type="email"
                  onChange={(e) => dispatch(setBCC(e.target.value))}
                  className="shadow-none border-0 border-bottom rounded-0"
                  aria-label="To"
                  placeholder="Recipients"
                  value={compose.bcc}
                />
              </InputGroup>
            )}

            <Form.Group
              className="d-flex justify-content-between"
              controlId="formBasicEmail"
            >
              <Form.Control
                className="border-0 border-bottom rounded-0 shadow-none"
                type="text"
                placeholder="Subject"
                onChange={(e) => dispatch(setSubject(e.target.value))}
                required
                value={compose.subject}
              />
            </Form.Group>
            <Form.Group>
              <Editor
                editorState={editorState}
                toolbarClassName={stylesheet["editor-toolbar"]} // Apply custom toolbar styles
                wrapperClassName={stylesheet["wrapper-class"]} // Add your wrapper class here
                editorClassName={stylesheet["editor-class"]}
                onEditorStateChange={onEditorStateChange}
                // value={compose.message}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" className="mt-3">
                Send
              </Button>
              <Button
                className="mt-3   "
                onClick={handleClose}
                variant="outline-danger"
              >
                <MdOutlineDeleteOutline />
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ComposeEmail;
