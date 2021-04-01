import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    // d = d.setDate(d.getDate() + 1);

    // var month = "" + (d.getMonth() + 1),
    //   day = "" + d.getDate(),
    //   year = d.getFullYear();

    // if (month.length < 2) month = "0" + month;
    // if (day.length < 2) day = "0" + day;

    // return [year, month, day].join("-");
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://myflix89.herokuapp.com/users/" + localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let url =
  //     "https://myflix89.herokuapp.com/users/" +
  //     localStorage.getItem("user");

  //   let user = {
  //     Username: this.state.username,
  //     Password: this.state.password,
  //     Email: this.state.email,
  //     Birthday: this.state.dob,
  //   };
  //   let token = localStorage.getItem("token");
  //   axios
  //     .put(url, user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       alert("Profile Updated");
  //       this.props.setUsername(this.state.username);
  //     });
  // }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflix89.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  // handleDelete() {
  //   if (!confirm("Are you sure?")) return;
  //   let token = localStorage.getItem("token");
  //   let url =
  //     "https://myflix89.herokuapp.com/users/" + localStorage.getItem("user");
  //   axios
  //     .delete(url, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => console.log(response));

  //   localStorage.removeItem("token");
  //   // localStorage.removeItem("user");
  //   window.open("/", "_self");
  // }
  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://myflix89.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);

    if (!movies) alert("Please sign in");
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Form style={{ width: "36rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.dob}</Form.Label>
                </Form.Group>
                <div className="profile-button">
                  {
                    <Link to={`/update/${this.state.username}`}>
                      <Button
                        variant="primary"
                        type="link"
                        style={{ marginRight: "10px" }}
                        className="profile-button"
                      >
                        Edit
                      </Button>
                    </Link>
                  }
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete()}
                    style={{ marginRight: "10px" }}
                  >
                    Delete User
                  </Button>
                  <Link to={`/`}>
                    <Button
                      variant="light"
                      type="submit"
                      style={{ marginRight: "10px" }}
                      className="profile-button"
                    >
                      Back
                    </Button>
                  </Link>
                </div>
              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "16rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card style={{ width: "13rem" }} className="movie-card">
                        <Card.Img
                          variant="top"
                          className="card-image"
                          src={movie.ImagePath}
                        />
                        <Card.Body className="card-body">
                          <Card.Title className="card-title">
                            {movie.Title}
                          </Card.Title>
                          <Card.Text className="card-text">
                            {movie.Description}
                          </Card.Text>
                          <Link to={`/movies/${movie._id}`}>
                            <Button className="card-button" variant="secondary">
                              Open
                            </Button>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button
                        onClick={() => this.removeFavorite(movie)}
                        className="profile-button"
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
