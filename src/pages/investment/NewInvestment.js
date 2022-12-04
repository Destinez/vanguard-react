
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Badge, Dropdown, ButtonGroup, InputGroup, Form, FormSelect, Container } from '@themesberg/react-bootstrap';

import { Plans } from "../../components/Widgets";
import setAuthToken from "../validation/authAuthToken";
const axios = require('axios').default;

export default () => {

  const [link, setLink] = useState("")
  const [amount, setAmount] = useState("")
  const [plans, setPlans] = useState([])
  const [profile, setProfile] = useState([])
  const [currentPlan, setCurrentPlan] = useState([])
  const [toggle, setToggle] = useState({
    plan: 0,
    switch: false
  })

  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");
  let token = localStorage.getItem("token");

  useEffect(() => {
    setAuthToken(token);
    fetchPlans(token)
    fetchProfile(token)
  }, [])

  let fetchProfile = async (token) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/profile`, {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        let res = response.data

        if (res.status === true && res.code === 200) {
            setProfile(res.data)
            console.log(res.data)
        }
    } catch (err) {
        console.error(err);
    }
}

  let fetchPlans = async (token) => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/investment-plans`, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      let res = response.data

      if (res.status === true && res.code === 200) {
        setPlans(res.data)
      }
    } catch (err) {
      console.error(err);
    }
  }


  let fetchPlanID = (id) => {
    plans.map((item, key) => {

      if (item.plan_id == id) {
        setCurrentPlan(item)
      }
    })
  }

  let submitInvest = async (e) => {

    e.preventDefault()
    setMessage("")
    setErrorClass('')

    let data = {
      amount: amount,
      plan_id: currentPlan.plan_id
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/create-balance-deposit-investment`, data, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      let res = response.data

      if (res.status === false && res.code === 422) {
        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')

        res.errors.amount[0] && setMessage(res.errors.amount[0])
        res.errors.plan_id[0] && setMessage(res.errors.plan_id[0])


      }
      else if (res.status === true && res.code === 200) {
        setMessage(res.message)
        setErrorClass('text-white bg-success rounded-1 my-2 px-2')
      }
      else if (res.status === false && res.code === 423) {
        setMessage(res.message)
        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
      }
    } catch (err) {
      console.error(err);
    }
  }

  const invest = (e, id) => {
    e.preventDefault()

    setToggle({
      plan: id,
      switch: true
    })

    fetchPlanID(id)
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
              {/* <Card.Header>
                <Button variant="info" size="xs" >Back</Button>
              </Card.Header> */}
              {toggle.switch == false &&
                <Card.Body className="new-investment">
                  <h5 className="mb-4 text-center">Choose an Investment Plan</h5>

                  <Row>
                    {plans ?
                      plans.map((plan, key) => {
                        return <Col md={6} key={key} className="mb-4">
                          <Card border="light" className="shadow-sm bg-dark text-white">
                            <Card.Body>
                              <Row className="d-block d-xl-flex align-items-center ">


                                <Col md={12} className="text-xl-center d-flex align-items-center justify-content-center mb-2 ">
                                  <div className="text-white">
                                    <h5>{plan.name}</h5>
                                  </div>
                                </Col>
                                <Col md={12} className="mb-2">
                                  <Container className="d-flex justify-content-end p-0">
                                    <Badge bg="warning" text="white" className="badge-lg w-100 py-3 text-weight-bolder fs-5">{plan.rate}% in {plan.duration} {plan.duration_label}</Badge>
                                  </Container>
                                </Col>
                                <Col md={12} className="mb-2">
                                  <Row className="bg-light align-items-center m-auto">
                                    <Col md={12} className="d-flex justify-content-between">
                                      <h6 className="my-1 text-dark">Min. Deposit: </h6>
                                      <h5 className="my-1 text-dark font-weight-bolder"> ${plan.min_amount}</h5>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={12} className="mb-2">
                                  <Row className="bg-light align-items-center m-auto">
                                    <Col md={12} className="d-flex justify-content-between">
                                      <h6 className="my-1 text-dark">Max. Deposit: </h6>
                                      <h5 className="my-1 text-dark font-weight-bolder"> ${plan.max_amount}</h5>
                                    </Col>
                                  </Row>
                                </Col>
                                <div className="">
                                  {/* <small className="text-muted">{plan.description}</small> */}
                                  <small className="text-muted">
                                    Trade the {plan.name} and access benefits like earning up to {plan.rate}% Weekly on your crypto.
                                  </small>
                                </div>
                                <div className="mt-3 mb-0">
                                  <Button variant="secondary" onClick={e => invest(e, plan.plan_id)} className="w-100">Trade Now</Button>
                                </div>
                              </Row>
                            </Card.Body>
                          </Card >
                        </Col>
                      }) : null}
                  </Row>
                </Card.Body>
              }

              {toggle.switch == true &&
                <Card.Body className="complete-investment">
                  <h5 className="mb-4 text-center">Invest into <span className="text-warning">{currentPlan.name}</span></h5>
                  <Form method="post" onSubmit={submitInvest}>
                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Group id="deposit">
                          <Form.Label>Minimum Investment Amount (USD)</Form.Label>
                          <Form.Control required type="text" placeholder={`$${currentPlan.min_amount}`} disabled={true} />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group id="deposit">
                          <Form.Label>Minimum Investment Amount (USD)</Form.Label>
                          <Form.Control required type="text" placeholder={`$${currentPlan.max_amount}`} disabled={true} />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group id="deposit">
                          <Form.Label>Amount (USD)</Form.Label>
                          <Form.Control onChange={e => setAmount(e.target.value)} required type="text" placeholder="Enter Amount to Invest" />
                        </Form.Group>
                      </Col>
                      <div>
                        Balance: ${profile.wallet_balance} <small className="text-danger ml-2 pl-2">(Investment amount will be charged from your balance)</small>
                      </div>

                    </Row>

                    <div className={`text-uppercase ${errorClass}`}>{message}</div>
                    <div className="mt-3">
                      <Button variant="info" type="submit">Invest</Button>
                    </div>
                  </Form>
                </Card.Body>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
