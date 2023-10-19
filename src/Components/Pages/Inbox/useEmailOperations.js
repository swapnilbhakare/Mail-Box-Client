import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmails,
  markEmailAsReadAction,
  deleteInboxEmailAction,
  fetchNewEmails,
} from "../../../Store/email-actions";
const useEmailOperations = () => {
  const dispatch = useDispatch();
  const recipientEmail = useSelector((state) => state.authentication.userId);
  useEffect(() => {
    if (recipientEmail) {
      console.log("Fetching emails...");

      dispatch(fetchEmails(recipientEmail));
    }
  }, [dispatch, recipientEmail]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (recipientEmail) {
        dispatch(fetchNewEmails(recipientEmail));
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, recipientEmail]);
  const markEmailAsRead = (emailId) => {
    dispatch(markEmailAsReadAction(emailId));
  };
  const deleteEmail = (emailId) => {
    dispatch(deleteInboxEmailAction(emailId));
  };
  return { markEmailAsRead, deleteEmail };
};
export default useEmailOperations;
