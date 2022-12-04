
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import setAuthToken from '../validation/authAuthToken';
const axios = require('axios').default;


export default () => {
  const [verify, setVerify] = useState({
    status: false,
    message: "",
    errorClass: ""
  });
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let token_temp = params.get('token');


  useEffect(() => {
    verifyToken(token_temp);

    console.log(verify)
  }, [])

  let verifyToken = async (token_temp) => {

    let token = {
      reset_token: token_temp
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify-reset-password-link`, token, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let res = response.data
      console.log(res)

      if (res.status === true && res.code === 200) {
        setVerify({ ...verify, status: true })
        setErrorClass('text-white bg-success rounded-1 my-2 px-2')
      }
    } catch (err) {
      console.error(err);
    }
  }



  let handleSubmit = async (e) => {
    setMessage("")
    setErrorClass("")

    e.preventDefault()

    let data = {
      reset_token: token_temp,
      password: password,
      password_confirmation: passwordConfirm
    }
    console.log(data)

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let res = response.data

      if (res.status === false && res.code === 422) {

        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')

        res.errors.password[0] && setMessage(res.errors.password[0])
        res.errors.reset_token[0] && setMessage(res.errors.reset_token[0])

      }

      else if (res.status === true && res.code === 200) {
        setMessage(res.message)
        setErrorClass('text-white bg-success rounded-1 my-2 px-2')

        setTimeout(() => {
          window.location.href = '/sign-in'
        }, 1000);
        
      }

      else if (res.status === false && res.code === 423) {
        setMessage(res.message)
        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border vh-75 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                {verify.status == false && <div className="text-white bg-danger rounded-1 my-2 px-2">Invalid Password Reset Link or Page Expired</div>}
                {verify.status == true &&
                  <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          onChange={e => setPasswordConfirm(e.target.value)}
                          placeholder="Confirm Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className={errorClass}>{message}</div>
                    <Button variant="primary" type="submit" className="w-100">
                      Reset password
                    </Button>
                  </Form>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
