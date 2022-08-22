import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { saveAlerts, saveAlertsActive } from "src/services/alerts";
import { fetchUser } from "src/services/fetchUser";
import AlertModal, { IAlert } from "./AlertModal";

export default function Home() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [active, setActive] = useState(false);

  React.useEffect(() => {
    if (!username) {
      navigate("/login");
    } else {
      fetchUser(username).then((res) => {
        if (res.success) {
          setAlerts(res.user.alerts);
          setActive(res.user.active);
        }
      });
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleSave = (alerts: IAlert[]) => {
    setAlerts(alerts);
    saveAlerts({ username, alerts });
  };

  const handleActive = () => {
    setActive(!active);
    saveAlertsActive({ username, active: !active });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <i className="bi bi-bullseye text-primary m-2" /> Live Bet Notifier
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Hello <b className="text-light">{username}</b>
            </Navbar.Text>
            <Button
              size="sm"
              variant="outline-secondary"
              className="m-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center my-4">
          <Card className="pb-2">
            <Form.Check
              className="my-2"
              type="switch"
              label="Enable alert"
              checked={active}
              disabled={alerts.length === 0}
              onChange={handleActive}
            />
            {alerts?.map((a, i) => (
              <div key={i}>
                {i > 0 && (
                  <Row>
                    <i className="text-center">{`&`}</i>
                  </Row>
                )}
                <Row className="m-1">
                  <Col className="border">{a.category}</Col>
                  <Col className="border">
                    {a.category !== "Minute" && a.team}
                  </Col>
                  <Col className="border">{a.type}</Col>
                  <Col className="border">{a.value}</Col>
                </Row>
              </div>
            ))}
          </Card>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="primary"
            className="w-25 m-2"
            onClick={() => setModal(true)}
          >
            {alerts.length > 0 ? "Edit alert" : "Set alert"}
          </Button>
          <AlertModal
            show={modal}
            alerts={alerts}
            onClose={() => setModal(false)}
            onSave={handleSave}
          />
        </Row>
      </Container>
    </div>
  );
}
