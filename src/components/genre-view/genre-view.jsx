import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

    return (
      <div>
        <Card
          style={{
            width: "18rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100px",
            textAlign: "center",
          }}
          className="genre-view"
        >
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="secondary" className="back-button">
              Back
            </Button>
          </Link>
        </Card>
        <Container>
          <h4 className="mt-4">Some {genre.Name} movies</h4>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
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

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};
