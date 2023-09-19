import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  setTo,
  setCC,
  setBCC,
  setSubject,
  setMessage,
  resetCompose,
} from "../../Store/compose-slice";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
                type="email"
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
                onEditorStateChange={setEditorState}
               
                onChange={(e) => dispatch(setMessage(e.target.value))}
                value={compose.message}
              />
            </Form.Group>

            <Modal.Footer>
              <Button className="mt-3">Send</Button>
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
