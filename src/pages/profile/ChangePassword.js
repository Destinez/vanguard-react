
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Dropdown, ButtonGroup, InputGroup, Form, FormSelect, Container } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import setAuthToken from "../validation/authAuthToken";
const axios = require('axios').default;



export default () => {

  const [link, setLink] = useState("")

  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    setAuthToken(token);
  }, [])



  let submitChange = async (e) => {

    e.preventDefault()

    let data = {
      new_password: password,
      new_password_confirmation: passwordConfirm
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/update-password`, data, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      let res = response.data

      if (res.status === false && res.code === 422) {

        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
        
        res.errors.new_password[0] && setMessage(res.errors.new_password[0])
        res.errors.new_password_confirmation[0] && setMessage(res.errors.new_password_confirmation[0])

        
      }
      else if (res.status === true && res.code === 200) {
        setMessage(res.message)
        setErrorClass('text-white bg-success rounded-1 my-2 px-2')
      }
    } catch (err) {
      console.error(err);
    }
  }

  let handleReferralCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(link)
  }

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-3">
          <Col xs={12} sm={12} xl={12} className="mb-4">
            <Card>
              <div className="card-body">
                <div className="alert alert-success">
                  Welcome to Vangaurd Investments - your personal client area.
                </div>
                <div>
                  <span>
                    Your referral ID: <Link to="#" className="text-info" onClick={e => handleReferralCopy(e)}>Click to copy referral link</Link>
                  </span>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={12} xl={12} className="mb-4">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4 text-center">Change Account Password</h5>
                <Form method="post" onSubmit={submitChange}>
                  <Row className="">

                    <Col md={12} className="mb-3">
                      <Form.Group id="new-password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)} required type="password" placeholder="Enter New Password" />
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mb-3">
                      <Form.Group id="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirm New Password" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className={errorClass}>{message}</div>
                  <div className="mt-3">
                    <Button variant="info" type="submit">Change Password</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
