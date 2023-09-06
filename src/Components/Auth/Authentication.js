import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form, Row, Button, FloatingLabel, Container } from "react-bootstrap";
import { BiSolidLockAlt } from "react-icons/bi";
import styleshhet from './Authentication.module.css'


import { useDispatch } from "react-redux";
// AIzaSyBSRUpGLF7ibaidLOQigcjjDfdz-vXDTsU

 
const Authentication = () => {
 
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

 const submitHandler =(event)=>{
  event.preventDefault()
  const enterdEmail = emailInputRef.current.value
  const enterdPassword = passwordInputRef.current.value
  const enterdConfirmPassword = confirmPasswordInputRef.current.value

  let errorMessage
    let url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSRUpGLF7ibaidLOQigcjjDfdz-vXDTsU"

  if(enterdEmail && enterdPassword && enterdConfirmPassword){
    if(enterdPassword !== enterdConfirmPassword){
      alert("Please check Password")

    }else{
        fetch(url,{
          method:"POST",
          body:JSON.stringify({
            email:enterdEmail,
            password:enterdPassword,
            confirmPassword:enterdConfirmPassword,
            returnSecureToken:true
          }),
          headers:{
            "Content-Type": "application/json",
          }
        }).then((res)=>{
          if(res.ok){
            return res.json()
          }else{
            return res.json().then((data)=>{
              errorMessage = "Authentication Failed !"
              throw new Error(errorMessage)
            })
          }
        }).then((data)=>{
          console.log(data)
          console.log('signed up successfully')
        }).catch((err)=>{
          alert(err.message)
        })
      }


  }else{
    alert("Please enter valid details")
  }
 }
    

  
  
  return (
    <Container>
    <Form onSubmit={submitHandler}>
      

      
      <Row  className="d-flex p-3  flex-column shadow align-items-center mx-auto mt-5" style={{width:"400px"}}>
        <Col>
          <h2 className="p-1 mb-3 center">
            <BiSolidLockAlt   className="rounded-circle p-1 text-white bg-info" /> Sign Up
          </h2>
        </Col>

        <Col >
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                className={`${styleshhet['form-control']} border-0 border-bottom rounded-0 `}
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
                className={` ${styleshhet['form-control']} border-0 border-bottom rounded-0 `}
                type="password"
                placeholder="Enter password"
                ref={passwordInputRef}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm password"
              className="mb-3"
            >
              <Form.Control
                className={` ${styleshhet['form-control']} border-0 border-bottom rounded-0 `}
                type="password"
                placeholder="Confirm password"
                ref={confirmPasswordInputRef}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Button variant="outline-info" size="lg" className={styleshhet['submit-btn']} type="submit">Sign Up</Button>
          </Form.Group>

          {/* <Form.Group as={Col}>
            <Button> Forget Password ?</Button>
          </Form.Group> */}

        </Col>
      </Row>

    </Form>
    <Button type="button" variant="outline-info"  className={`${styleshhet['button']} mt-5`}>Have an Account? Login</Button>

    </Container>
  );
};

export default Authentication;
