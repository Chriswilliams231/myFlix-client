import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-veiw";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      showRegistration: false,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get("https://myflix89.herokuapp.com/movies")
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  toggleRegistration() {
    this.setState({ showRegistration: this.state.showRegistration });
  }

  render() {
    const { movies, selectedMovie, user, showRegistration } = this.state;

    if (!user && showRegistration) {
      <RegistrationView />;
    }

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={this.toggleRegistration}
        />
      );
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <div className="container">
          <div className="row">
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.onMovieClick(null)}
              />
            ) : (
              movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={(movie) => this.onMovieClick(movie)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
