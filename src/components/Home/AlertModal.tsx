import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const type = ["Over", "Under"] as const;
const scoreTypes = ["Home Team Leads", "Away Teams Leads", "Draw"] as const;
const teams = ["Home Team", "Away Team", "Any", "Total"] as const;

const categories = [
  "Minute",
  "Score",
  "Goals",
  "Ball Possession",
  "Goal Attempts",
  "Shots on Goal",
  "Corner Kicks",
  "Fouls",
  "Yellow Cards",
  "Red Cards",
] as const;

interface IProps {
  show: boolean;
  alerts: IAlert[];
  onClose: () => void;
  onSave: (alerts: IAlert[]) => void;
}

export interface IAlert {
  category: typeof categories[number];
  team?: typeof teams[number];
  type: typeof type[number] | typeof scoreTypes[number];
  value: string;
}

export default function AlertModal(props: IProps) {
  const { show, alerts: defaultAlerts, onClose, onSave } = props;
  const [alert, setAlert] = React.useState<IAlert>({
    category: "Goals",
    team: "Total",
    type: "Over",
    value: "",
  });
  const [alerts, setAlerts] = React.useState<IAlert[]>([]);

  React.useEffect(() => {
    setAlerts(defaultAlerts);
  }, [defaultAlerts]);

  const handleAdd = () => {
    if (!alert.value && alert.category !== "Score") {
      return;
    }
    setAlerts([...alerts, alert]);
  };
  const handleRemove = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create new alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid={true}>
          {alerts.map((a, i) => (
            <Row key={i} className="m-2">
              <Col xs={12} md={3}>
                {a.category}
              </Col>
              <Col xs={12} md={3}>
                {a.category !== "Minute" && a.category !== "Score" && a.team}
              </Col>
              <Col xs={12} md={3}>
                {a.type}
              </Col>
              <Col xs={12} md={2}>
                {a.category !== "Score" && a.value}
              </Col>
              <Col style={{ flex: 0 }} xs={12} md={1}>
                <Button
                  size="sm"
                  variant="link"
                  onClick={(e) => handleRemove(i)}
                >
                  <i className="bi bi-x p-0"></i>
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="m-2">
            <Col>
              <Form.Select
                size="sm"
                style={{ minWidth: 120 }}
                value={alert.category}
                onChange={(e) =>
                  setAlert((alert) => ({
                    ...alert,
                    category: e.target.value as IAlert["category"],
                  }))
                }
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>
            {alert.category !== "Score" && (
              <>
                {alert.category !== "Minute" && (
                  <Col>
                    <Form.Select
                      size="sm"
                      style={{ minWidth: 120 }}
                      value={alert.team}
                      onChange={(e) =>
                        setAlert((alert) => ({
                          ...alert,
                          team: e.target.value as IAlert["team"],
                        }))
                      }
                    >
                      {teams.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Form.Select>
                  </Col>
                )}
                <Col>
                  <Form.Select
                    size="sm"
                    style={{ minWidth: 120 }}
                    value={alert.type}
                    onChange={(e) =>
                      setAlert((alert) => ({
                        ...alert,
                        type: e.target.value as IAlert["type"],
                      }))
                    }
                  >
                    {type.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    style={{ minWidth: 120 }}
                    placeholder="Value"
                    required={true}
                    value={alert.value}
                    onChange={(e) =>
                      setAlert((alert) => ({
                        ...alert,
                        value: e.target.value,
                      }))
                    }
                  />
                </Col>
              </>
            )}
            {alert.category === "Score" && (
              <Col>
                <Form.Select
                  size="sm"
                  style={{ minWidth: 120 }}
                  value={alert.type}
                  onChange={(e) =>
                    setAlert((alert) => ({
                      ...alert,
                      type: e.target.value as IAlert["type"],
                    }))
                  }
                >
                  {scoreTypes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Col>
            )}
            <Col style={{ flex: 0 }}>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-circle"
                onClick={handleAdd}
              >
                <i className="bi bi-plus p-0"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            onSave(alerts);
            onClose();
          }}
        >
          Save alert
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
