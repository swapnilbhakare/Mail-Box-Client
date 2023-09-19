import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [editorState, setEditorState] = useState(() => {
    if (compose.message) {
      try {
        const contentState = convertFromRaw(JSON.parse(compose.message));

        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error("Error parsing compose.message:", error);
      }
    }

    return EditorState.createEmpty(); // Create an empty editor state if message is empty
  });

  const onEditorStateChange = (newEditorState) => {
    console.log(newEditorState)
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const messageData = JSON.stringify(convertToRaw(contentState));
    dispatch(setMessage(messageData));
  };

  const senderId = useSelector((state) => state.authentication.userId);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      to: compose.to,
      cc: compose.cc,
      bcc: compose.bcc,
      subject: compose.subject,
      message: compose.message,
      sender: senderId,
    };
    try {
      const response = await fetch(
        "https://mail-box-client-8848b-default-rtdb.asia-southeast1.firebasedatabase.app/emails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send email.");
      }
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
      <Modal fullscreen show={props.show} onHide={() => props.setShow(false)}>
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
                toolbarClassName={stylesheet["toolbar-class"]}
                wrapperClassName={stylesheet["wrapper-class"]}
                editorClassName={stylesheet["editor-class"]}
                onEditorStateChange={onEditorStateChange}
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
