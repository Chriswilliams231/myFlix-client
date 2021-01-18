import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./main-view.scss";

import MoviesList from "../movie-list/movie-list";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-veiw";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    this.state = {
      user: null,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflix89.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        // this.setState({
        //   movies: response.data,
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.setState({
      user: null,
    });
  }

  render() {
    // const { movies, user } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Navbar sticky="top" expand="lg" className=" nav mb-2 navbar-styles">
          <Navbar.Brand className="navbar-brand">
            <Link to={`/`} className="nav-link">
              <h1 className="my-flix">MyFlix</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse
            className="justify-content-end navbar-light"
            id="basic-navbar-nav"
          >
            {!user ? (
              <ul>
                <Link to={`/`}>
                  <Button variant="link">login</Button>
                </Link>
                <Link to={`/register`}>
                  <Button variant="link">Register</Button>
                </Link>
              </ul>
            ) : (
              <ul>
                <Link to={`/`}>
                  <Button variant="link">Movies</Button>
                </Link>
                <Link to={`/users/`}>
                  <Button variant="link">Account</Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="link" onClick={() => this.logOut()}>
                    Log out
                  </Button>
                </Link>
              </ul>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Route
          exact
          path="/"
          render={() => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
          }}
        />
        <Route path="/register" render={() => <RegistrationView />} />
        <Route
          path="/movies/:MovieId"
          render={({ match }) => (
            <MovieView
              movie={movies.find((m) => m._id === match.params.MovieId)}
            />
          )}
        />

        <Route
          path="/directors/:name"
          render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (
              <DirectorView
                director={
                  movies.find((m) => m.Director.Name === match.params.name)
                    .Director
                }
              />
            );
          }}
        />
        <Route
          path="/genres/:name"
          render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (
              <GenreView
                genre={
                  movies.find((m) => m.Genre.Name === match.params.name).Genre
                }
              />
            );
          }}
        />
        <Route
          path="/users/"
          render={() => (
            <ProfileView movies={movies} logOutFunc={() => this.logOut()} />
          )}
        />
        {/* <Route path="/Update/:name" render={() => <UpdateView />} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} /> */}
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
