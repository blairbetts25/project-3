import React, { Component } from "react";
import PostCard2 from "../components/PostCard2";
import API from "../utils/API";
import { Container, Button, Spinner } from "react-bootstrap";
import Foodform from "../components/Foodform"
import { Link } from "react-router-dom";

// import { Input, TextArea, FormBtn } from "../../components/Form";
// import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";

class Home2 extends Component {
  // Setting our component's initial state
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      rating: 0,
      user: '',
      isloggedIn: props.isloggedIn
    };
  }

  // When the component mounts, load all dishes and save them to this.state.dishes[]
  componentDidMount() {
    this.loadDishes();
  }

  // Loads all dishes
  loadDishes = () => {
    API.getDishes()
      .then(res =>
        this.setState({ dishes: Array.from(res.data) })
      )
      .catch(err => console.log(err));
  };

  renderStars = (rating) => {

    switch (rating) {
      case "1": {
        return "⭐✩✩✩✩✩✩✩✩✩ 1/10";
      }
      case 2: {
        return "⭐⭐✩✩✩✩✩✩✩✩ 2/10";
      }
      case 3: {
        return "⭐⭐⭐✩✩✩✩✩✩✩ 3/10";
      }
      case 4: {
        return "⭐⭐⭐⭐✩✩✩✩✩✩ 4/10";
      }
      case 5: {
        return "⭐⭐⭐⭐⭐✩✩✩✩✩ 5/10";
      }
      case 6: {
        return "⭐⭐⭐⭐⭐⭐✩✩✩✩ 6/10";
      }
      case 7: {
        return "⭐⭐⭐⭐⭐⭐⭐✩✩✩ 7/10";
      }
      case 8: {
        return "⭐⭐⭐⭐⭐⭐⭐⭐✩✩ 8/10";
      }
      case 9: {
        return "⭐⭐⭐⭐⭐⭐⭐⭐⭐✩ 9/10";
      }
      case 10: {
        return "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 10/10";
      }
      default: {
        this.setState.rating = "No Rating";
        break;
      }
    }
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveDish method to save the dish data
  // Then reload dishes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.description) {
      API.saveDish({
        name: this.state.name,
        description: this.state.description,
      })
        .then(res => this.loadDishes())
        .catch(err => console.log(err));
    }
  };

  render() {

    if (!this.state.isloggedIn) {
      return (
        <div className="compactContainer">
          <Link to="/">
            <Button className="toCompact" size="sm"/>
          </Link>          
          <Container fluid>
            {this.state.dishes && this.state.dishes.length ? (
              <Container>
                {this.state.dishes.map(dish => {
                  return (
                    <PostCard2 key={dish._id}
                      username={dish.username}
                      profilePic={dish.profilePic}
                      name={dish.name}
                      description={dish.description}
                      image={dish.image}
                      address={dish.address}
                      date={dish.date}
                      rating={dish.rating}
                      renderStars={this.renderStars}
                      renderStarIcon={dish.renderStarIcon}>
                    </PostCard2>
                  );
                })}
              </Container>
            ) : (
              <Spinner className="loadSpinner" animation="grow" variant="dark" />
              )}
          </Container>
        </div>
      );
    } else {
      return (
        <div className="compactContainer">
          <Link to="/">
          <Button className="toFeed" size="sm"/>
          </Link>          
          <Container fluid>
            {this.state.dishes && this.state.dishes.length ? (
              <Container>
                {this.state.dishes.map(dish => {
                  return (
                    <PostCard2 key={dish._id}
                      username={dish.username}
                      profilePic={dish.profilePic}
                      user={dish.user}
                      name={dish.name}
                      description={dish.description}
                      image={dish.image}
                      address={dish.address}
                      date={dish.date}
                      rating={dish.rating}
                      renderStars={this.renderStars}
                      renderStarIcon={dish.renderStarIcon}>
                    </PostCard2>
                  );
                })}
              </Container>
            ) : (
              <Spinner className="loadSpinner" animation="grow" variant="dark" />
              )}
          </Container>
          <div className="submitDish">
            <Foodform />
          </div>
        </div>
      )
    }
  }
}
export default Home2;