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
import { useNavigate } from "react-router-dom";
import { login } from "../../Store/auth-slice";
import { useDispatch } from "react-redux";
// AIzaSyBSRUpGLF7ibaidLOQigcjjDfdz-vXDTsU

const Authentication = () => {
  const navigate = useNavigate();
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
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    const enterdConfirmPassword = !isLogin
      ? confirmPasswordInputRef.current.value
      : null;

    let url;
    if (!isLogin && enterdPassword !== enterdConfirmPassword) {
      toast.error("Passwords did not match", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSRUpGLF7ibaidLOQigcjjDfdz-vXDTsU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSRUpGLF7ibaidLOQigcjjDfdz-vXDTsU";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enterdEmail,
          password: enterdPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const idToken = data.idToken;
        const userId = data.email;
        dispatch(login({ idToken, userId }));
        if (isLogin) {
          toast.success("User has successfully signed in", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });

          navigate("/home");
        } else {
          // navigate("/verification");
          toast.success("User has successfully signed up", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        if (!isLogin) {
          confirmPasswordInputRef.current.value = "";
        }
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      } else {
        const data = await response.json();
        if (isLogin) {
          if (data.error.message === "EMAIL_NOT_FOUND") {
            toast.error("User not found.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else if (data.error.message === "INVALID_PASSWORD") {
            toast.error("Invalid password.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Login Failed!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          if (data.error.message === "EMAIL_EXISTS") {
            toast.error("User already exists.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Sign-up Failed!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", {
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

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row
          className="d-flex p-3  flex-column shadow align-items-center mx-auto mt-5"
          style={{ width: "400px" }}
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

            {/* <Form.Group as={Col}>
            <Button> Forget Password ?</Button>
          </Form.Group> */}
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
