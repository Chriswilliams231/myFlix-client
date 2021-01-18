import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div>
        <Card
          style={{
            width: "16rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="director-view"
        >
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Birthdate: {director.Birth}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="secondary" className="back-button">
              Back
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
};
