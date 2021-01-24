import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./movie-view.scss";

import axios from "axios";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflix89.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/users/", "_self");
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img
          className="movie-poster"
          src={movie.ImagePath}
          width={300}
          height={400}
        />
        <div className="movie-info">
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>
          <div className="movie-button">
            <Button
              variant="secondary"
              onClick={() => this.addFavorite(movie)}
              className="color-button"
            >
              Add Favorite
            </Button>{" "}
            {/* <br /> */}
            <Link to={"/"}>
              <Button variant="secondary" type="button" className="back-button">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
