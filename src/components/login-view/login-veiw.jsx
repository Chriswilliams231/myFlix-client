import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { Link } from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://myflix89.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <div className="login-view">
      <h1>Welcome to myFlix!</h1>
      <p>Please log in or register</p>
      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="button"
          onClick={handleSubmit}
          className="login-button"
        >
          Login
        </Button>
        <Link to={"/register"}>
          <Button variant="secondary" type="button" className="login-button">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};
