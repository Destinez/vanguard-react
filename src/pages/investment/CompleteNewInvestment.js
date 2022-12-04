
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Alert, Form, FormSelect, Container } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {

  const [link, setLink] = useState("")

  let { plan_id } = useParams()


  console.log(plan_id)

  useEffect(() => {

  }, [])

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
                  Welcome to Vanguard Investments - your personal client area.
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
              <Card.Body className="complete-investment">
                <h5 className="mb-4 text-center">Withdraw Funds From Your Wallet</h5>
                <Form>
                  <Row>
                    <Col md={7} className="mb-3">
                      <Form.Group id="deposit">
                        <Form.Label>Minimum Investment Amount (USD)</Form.Label>
                        <Form.Control required type="text" placeholder="$100" disabled={true} />
                      </Form.Group>
                    </Col>
                    <Col md={7} className="mb-3">
                      <Form.Group id="deposit">
                        <Form.Label>Minimum Investment Amount (USD)</Form.Label>
                        <Form.Control required type="text" placeholder="$1000" disabled={true} />
                      </Form.Group>
                    </Col>
                    <Col md={7} className="mb-3">
                      <Form.Group id="deposit">
                        <Form.Label>Enter Amount (USD)</Form.Label>
                        <Form.Control required type="text" placeholder="$1000" />
                      </Form.Group>
                    </Col>
                    <div>Balance: $0.00</div>
                    <small className="text-danger">
                      Investment amount will be charged from your balance
                    </small>
                        

                  </Row>
                  <div className="mt-3">
                    <Button variant="info" type="submit">Invest</Button>
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
