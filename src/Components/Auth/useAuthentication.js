import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { login } from "../../Store/auth-slice";

function useAuthentication() {
  const history = useHistory();

  const dispatch = useDispatch();
  const auth = getAuth();

  const loginHandler = async (enteredEmail, enteredPassword) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      dispatch(login({ idToken, userId: user.email }));
      toast.success("User has successfully signed in");
      history.replace("/inbox");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  const signupHandler = async (
    enteredEmail,
    enteredPassword,
    enteredConfirmPassword
  ) => {
    if (enteredPassword !== enteredConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      dispatch(login({ idToken, userId: user.email }));
      toast.success("User has successfully signed up");
      history.replace("/inbox");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  return { loginHandler, signupHandler };
}
export default useAuthentication;
