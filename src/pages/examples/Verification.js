
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter, faBootstrap } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Toast } from '@themesberg/react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import setAuthToken from '../validation/authAuthToken';
const axios = require('axios').default;



export default () => {
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let token_temp = params.get('token');

  let token = {
    token: token_temp
  }

  console.log(token_temp)
  


  useEffect(() => {

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/verification?token=${token_temp}`,
      data: token,
      headers: {
        'Content-Type': 'application/json',
      }
    })

      .then(function (response) {
        console.log(response.data)

        let res = response.data

        if (res.status === false && res.code === 423) {
          setMessage(res.message)
          setErrorClass('text-white bg-danger rounded-1 my-2')
        }
        else if (res.status === false && res.code === 422) {
          setMessage(res.message)
          setErrorClass('text-white bg-danger rounded-1 my-2')
        }
        else if (res.status === true && res.code === 200) {
          setMessage(res.message)
          setErrorClass('text-white bg-success rounded-1 my-2')

          return
        }
        else {
          console.log(res)
        }
      })

      .catch(function (error) {
        console.log(error);
      })

  }, [])




  return (
    <main>
      <section className="d-flex align-items-center my-3 mt-lg-3 mb-lg-3">
        <Container>
          <Row className="justify-content-center form-bg-image vh-100">
            <Col xs={12} className="d-flex align-items-center justify-content-center h-100">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h6 className={errorClass}>
                    {message}
                  </h6>

                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">

                    <Button variant='primary' as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Button>
                    
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
