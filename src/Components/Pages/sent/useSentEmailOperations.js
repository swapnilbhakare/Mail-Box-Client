import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSentEmails,
  fetchSentNewEmails,
  deleteSentEmailAction, // Define the action for deleting sent emails
} from "../../../Store/email-actions";

const useSentEmailOperations = () => {
  const dispatch = useDispatch();
  const recipientEmail = useSelector((state) => state.authentication.userId);
  useEffect(() => {
    if (recipientEmail) {
      dispatch(fetchSentEmails(recipientEmail));
    }
  }, [dispatch, recipientEmail]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (recipientEmail) {
        dispatch(fetchSentNewEmails(recipientEmail));
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, recipientEmail]);
  const deleteSentEmail = (emailId) => {
    dispatch(deleteSentEmailAction(emailId));
  };
  return { deleteSentEmail };
};

export default useSentEmailOperations;
