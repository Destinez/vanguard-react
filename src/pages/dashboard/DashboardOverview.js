
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { Col, Row, Card} from '@themesberg/react-bootstrap';
import { UserContext } from "../validation/UserContext"
import setAuthToken from "../validation/authAuthToken";
const axios = require('axios').default;

export default () => {

  const [link, setLink] = useState("")
  const [currentInvestment, setCurrentInvestment] = useState([])
  const [profile, setProfile] = useState([])

  // let temp = useContext(UserContext)

  // console.log(temp)

  useEffect(() => {

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "490",
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "light",
      "locale": "en"
    })
    document.getElementById("trading-view").appendChild(script);
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

    fetchCurrentInvestment(token)
    fetchProfile(token)
}, [])



let fetchCurrentInvestment = async (token) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/current-investment`, {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        let res = response.data

        if (res.status === true && res.code === 200) {
            setCurrentInvestment(res.data)
            console.log(res.data)
        }
    } catch (err) {
        console.error(err);
    }
}
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

  let handleReferralCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(link)
  }

  return (
    <>

      <Row className="justify-content-md-center">

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

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Current Plan"
            title="Gold"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Investment Earnings"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Referrals Earnings"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4 " id="trading-view">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </Col>
      </Row>
    </>
  );
};
