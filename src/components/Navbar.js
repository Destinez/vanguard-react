
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

import { UserContext } from "../pages/validation/UserContext"
const axios = require('axios').default;



export default (props) => {
  const user = useContext(UserContext)
  const [profile, setProfile] = useState([])


  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

  let token = localStorage.getItem("token");
  useEffect(() => {
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


  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 300);
  };


  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 mb-3 bg-dark sticky-header">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
            </Form>
          </div>
          <Nav className="align-items-center">
            <div>
              {user}
            </div>

            <Nav.Item className="mr-2">
              Balance: ${profile.wallet_balance}
            </Nav.Item>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">

                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item as={Link} to="/account/profile" className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" />My Profile

                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/account/change-password" className="fw-bold">

                  <FontAwesomeIcon icon={faCog} className="me-2" />Change Password
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item as={Link} to="/logout" className="fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
