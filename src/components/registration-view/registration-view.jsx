import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import "./registration-view.scss";

import { Link } from "react-router-dom";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    axios
      .post("https://myflix89.herokuapp.com/users", createdUser)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("User created successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e.response);
        alert("Error processing request");
      });
  };

  return (
    <Container>
      <br />
      <br />
      <h1 className="reg-heading">Welcome to myFlix!</h1>
      <Form style={{ width: "32rem", margin: "auto", textAlign: "center" }}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            placeholder="12/31/1986"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="secondary"
          type="submit"
          onClick={handleSubmit}
          className="reg-button"
        >
          Submit
        </Button>
        <Link to={`/`}>
          <Button variant="secondary" type="submit" className="reg-button">
            Cancel
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
