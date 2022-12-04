
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
  const [withdrawalMethods, setWithdrawalMethods] = useState([])
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const [wallet, setWallet] = useState("")
  const [message, setMessage] = useState("")
  const [errorClass, setErrorClass] = useState("");
  let token = localStorage.getItem("token");

  useEffect(() => {
    setAuthToken(token);

    console.log(message)
  }, [])


  let submitTransfer = async (e) => {

    e.preventDefault()

    setMessage("")
    setErrorClass('')

    let data = {
      amount: amount,
      address: wallet
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/internal-transfer`, data, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      let res = response.data
      console.log(res)

      if (res.status === false && res.code === 422) {
        setErrorClass('text-white bg-danger rounded-1 my-2 px-2')
        if (res.errors.amount[0]) {
          setMessage(res.errors.amount[0])
        }
        // if (res.errors.address[0]) {
        //   setMessage(res.errors.address[0])
        // }
        
        res.errors.address[0] && setMessage(res.errors.address[0])
        // res.errors.amount[0] && setMessage(res.errors.amount[0])

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
                <h5 className="mb-4 text-center">Transfer Funds To Another Vangaurd ID</h5>
                <Form method="post" onSubmit={submitTransfer}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="deposit">
                        <Form.Label>Enter Amount (USD)</Form.Label>
                        <Form.Control onChange={e => setAmount(e.target.value)} required type="text" placeholder="Enter Amount to Transfer" />
                      </Form.Group>
                    </Col>


                    <Col md={6} className="mb-3">
                      <Form.Group id="wallet-address">
                        <Form.Label>Enter Wallet Address</Form.Label>
                        <Form.Control onChange={e => setWallet(e.target.value)} required type="text" placeholder="Enter the Destination Address" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className={errorClass}>
                    {message ? message : null}
                    </div>
                  <div className="mt-3">
                    <Button variant="info" type="submit">Transfer</Button>
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
