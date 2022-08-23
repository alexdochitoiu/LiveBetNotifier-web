import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { login } from "src/services/auth";
import { subscribeUser } from "src/services/subscription";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [username, password]);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login({ username, password }).then((res) => {
      if (res.success) {
        localStorage.setItem("username", username);
        subscribeUser();
        navigate("/");
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="Login">
      <h2>
        <i className="bi bi-bullseye text-primary m-2" /> Live Bet Notifier
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && (
          <Alert className="mt-3 pt-1 pb-1" variant="danger">
            {error}
          </Alert>
        )}
        <Button type="submit" disabled={!validateForm()} className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
}
