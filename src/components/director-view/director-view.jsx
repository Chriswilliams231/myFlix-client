import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./director-view.scss";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return (
      <div>
        <Card className="director-view">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Bio: {director.Bio}</Card.Text>
            <Card.Text className="birthdate">
              Birthdate: {director.Birth}
            </Card.Text>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="secondary" className="director-button">
              Back
            </Button>
          </Link>
        </Card>
        <Container>
          <h4 className="mt-4">Some {director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100 director-fav"
                      style={{ width: "16rem" }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Link
                          className="text-muted"
                          to={`/movies/${movie._id}`}
                        >
                          <Card.Title>{movie.Title}</Card.Title>
                        </Link>
                        <Card.Text>
                          {movie.Description.substring(0, 90)}...
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-top-0">
                        <Link to={`/movies/${movie._id}`}>
                          <Button
                            variant="link"
                            className="read-more-link pl-0"
                          >
                            Read more
                          </Button>
                        </Link>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
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
