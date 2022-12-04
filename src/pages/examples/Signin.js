
import React, {useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import { UserContext } from '../validation/UserContext';
import setAuthToken from '../validation/authAuthToken';
const axios = require('axios').default;

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let token = localStorage.getItem("token");

  // const [user, setUser] = useContext(UserContext);




  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      email: email,
      password: password
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      }
    })


      .then(function (response) {
        let res = response.data

        if (res.status === true && res.code === 200) {



          setMessage('Login Successful')
          setErrorClass('text-white bg-success rounded-1 my-2 px-2')

          let token = res.data.token

          //set JWT token to local
          localStorage.setItem("token", token);

          //set token to axios common header
          setAuthToken(token);

          // setUser(email)


          //redirect user to home page
          window.location.href = '/dashboard'
        }

        else if (res.status === false && res.code === 422) {

          if (res.errors.password) {
            setMessage(res.errors.password[0])
          }

          if (res.errors.email) {
            setMessage(res.errors.email[0])
          }

          setErrorClass("text-white bg-danger rounded-1 my-2 px-2")
        }

        else if (res.status === false && res.code === 423) {
          setMessage("Email or Password is incorrect")
          setErrorClass("text-white bg-danger rounded-1 my-2 px-2")
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" method="post" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="Enter your Email" onChange={e => setEmail(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Enter your Password" onChange={e => setPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link as={Link} to="/forgot-password" className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <div className={ errorClass }>{ message }</div>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
