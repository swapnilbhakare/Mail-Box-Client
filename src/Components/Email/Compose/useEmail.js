import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const useEmail = () => {
  const sendEmail = async (emailData, userEmail) => {
    try {
      const senderEmailCollection = collection(db, "emails", userEmail, "sent");
      await addDoc(senderEmailCollection, emailData);

      // copy of the email to the recipient's mailbox collection
      if (emailData.to === userEmail) {
        const recipientEmailCollection = collection(
          db,
          "emails",
          emailData.to,
          "inbox"
        );
        await addDoc(recipientEmailCollection, emailData);
      }
      toast.success("Email sent successfully", {
        position: "top-right",
        autoClose: 5000,
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
  };
  return { sendEmail };
};
export default useEmail;
