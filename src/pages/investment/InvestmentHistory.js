
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Dropdown, ButtonGroup, InputGroup, Form, FormSelect, Table, Badge, Container } from '@themesberg/react-bootstrap';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {

  const [link, setLink] = useState("")

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
                <h5 className="mb-4 text-center">Investment History</h5>
                <div className="table-responsive">
                  <Table className="table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th className="border-0">Date</th>
                        <th className="border-0">Plan</th>
                        <th className="border-0">Amount</th>
                        <th className="border-0">Earnings</th>
                        <th className="border-0">Withdrawable</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-0">
                          <div><span className="text-muted">01 November, 2022</span></div>
                        </td>
                        <td className="border-0">
                          <div><span className="h6 fw-bold">Gold Package</span></div>
                        </td>
                        <td className="border-0">
                          <span className="fw-bold">$5400</span>
                        </td>
                        <td className="border-0">
                          <span className="fw-bold">$5400</span>
                        </td>
                        <td className="border-0">
                          <span className="fw-bold text-info">$5400</span>
                        </td>
                        <td className="border-0 fw-bold">
                          <Badge bg="warning" text="dark" className="me-1">Running</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
