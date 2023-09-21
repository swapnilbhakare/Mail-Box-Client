
import React from "react";

import { useSelector } from "react-redux";

const MessageDetail = () => {

  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  if (!selectedEmail) {
    return <p>Select an email to view details.</p>;
  }
  console.log(selectedEmail)

  return (
    <>
      <div className="message-detail">
        <h2>{selectedEmail.data.subject}</h2>
        <p>From: {selectedEmail.data.sender}</p>
        <p>Date: {selectedEmail.data.date}</p>
        <p>{selectedEmail.data.message}</p>{" "}
      </div>
    </>
  );
};

export default MessageDetail;
