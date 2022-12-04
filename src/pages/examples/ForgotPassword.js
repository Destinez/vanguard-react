
import React, {useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import setAuthToken from '../validation/authAuthToken';
const axios = require('axios').default;



export default () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let token = localStorage.getItem("token");

  let submitForgotPassword = async (e) => {

    e.preventDefault()

    let data = {
      email: email
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/forget-password`, data, {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        let res = response.data
        console.log(res)

        if (res.status === false && res.code === 422) {
            setMessage(res.errors.email[0])
            setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
        }
        else if (res.status === false && res.code === 423) {
            setMessage(res.message)
            setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
        }
        else if (res.status === true && res.code === 200){
          setMessage(res.message)
          setErrorClass('text-white bg-success rounded-1 my-2 px-2')
        }
    } catch (err) {
        console.error(err);
    }
}
  
  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
            </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Type in your email and we will send you a code to reset your password!</p>
                <Form method="post" onSubmit={submitForgotPassword}>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                    </InputGroup>
                  </div>
                  <div className={ errorClass }>{ message }</div>
                  <Button variant="primary" type="submit" className="w-100">
                    Recover password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
