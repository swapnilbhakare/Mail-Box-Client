import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Form,
  Row,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { BiSolidLockAlt } from "react-icons/bi";
import styleshhet from "./Authentication.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Store/auth-slice";
import axios from "axios"; // Import Axios

const Authentication = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = !isLogin
      ? confirmPasswordInputRef.current.value
      : null;

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const authData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    // Define the Firebase API endpoint URLs
    const signInUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEQsJpek_gtmwzG7ZNxTabt8vGQxZ8t8w";
    const signUpUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEQsJpek_gtmwzG7ZNxTabt8vGQxZ8t8w";

    // Use the appropriate URL based on the authentication mode
    const url = isLogin ? signInUrl : signUpUrl;

    try {
      const response = await axios.post(url, authData);

      if (response.status === 200) {
        const data = response.data;
        const idToken = data.idToken;
        const userId = data.email;
        dispatch(login({ idToken, userId }));

        toast.success(
          isLogin
            ? "User has successfully signed in"
            : "User has successfully signed up"
        );

        // Redirect the user to the desired page
        history.replace("/inbox");
      } else {
        const errorData = response.data.error;
        let errorMessage = "Authentication failed.";

        if (isLogin) {
          if (errorData.message === "EMAIL_NOT_FOUND") {
            errorMessage = "User not found.";
          } else if (errorData.message === "INVALID_PASSWORD") {
            errorMessage = "Invalid password.";
          }
        } else {
          if (errorData.message === "EMAIL_EXISTS") {
            errorMessage = "User already exists.";
          }
        }

        toast.error(errorMessage);
      }

      // Clear input fields
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      if (!isLogin) {
        confirmPasswordInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Container style={{ width: "400px", textAlign: "center" }}>
      <Form onSubmit={submitHandler}>
        <Row
          className="d-flex p-3  flex-column shadow align-items-center mx-auto mt-5"
          style={{ width: "400px", textAlign: "center" }}
        >
          <Col>
            <h2 className="p-1 mb-3 center">
              <BiSolidLockAlt className="rounded-circle p-1 text-white bg-info" />{" "}
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
          </Col>

          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  className={`${styleshhet["form-control"]} border-0 border-bottom rounded-0 `}
                  type="email"
                  placeholder="Enter Email"
                  ref={emailInputRef}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Enter password"
                className="mb-3"
              >
                <Form.Control
                  className={` ${styleshhet["form-control"]} border-0 border-bottom rounded-0 `}
                  type="password"
                  placeholder="Enter password"
                  ref={passwordInputRef}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            {!isLogin && (
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirm password"
                  className="mb-3"
                >
                  <Form.Control
                    className={` ${styleshhet["form-control"]} border-0 border-bottom rounded-0 `}
                    type="password"
                    placeholder="Confirm password"
                    ref={confirmPasswordInputRef}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            )}
            <Form.Group>
              <Button
                variant="outline-info"
                size="lg"
                className={styleshhet["submit-btn"]}
                type="submit"
              >
                {isLogin ? "Log In" : "Create an Account"}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button
        type="button"
        onClick={switchAuthModeHandler}
        variant="outline-info"
        className={`${styleshhet["button"]} mt-5`}
      >
        {isLogin
          ? "Don't have an Account? Sign Up"
          : "Have an Account? sign in"}
      </Button>
    </Container>
  );
};

export default Authentication;
