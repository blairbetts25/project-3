import React, { Component } from "react";
import PostCard2 from "../components/PostCard2";
import API from "../utils/API";
import { Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import Foodform from "../components/Foodform"
// import { Input, TextArea, FormBtn } from "../../components/Form";
// import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";


class Search extends Component {
  // Setting our component's initial state
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      rating: 0,
      user: '',
      search: '',
      isloggedIn: props.isloggedIn
    };
  }

  // state = {
  //   rating: 0,
  //   user: ''
  // };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
      
  }
  
  // Loads all dishes
  loadDishes = () => {
    API.getDishes()
      .then(res =>

        this.setState({dishes: Array.from(res.data)})

      )
      .catch(err => console.log(err));
  //var newData = this.state.data.concat([data]); 
  };

  // Deletes a book from the database with a given id, then reloads books from the db

  // deleteDish = id => {
  //   API.deleteDish(id)
  //     .then(res => this.loadDishes())
  //     .catch(err => console.log(err));
  // };

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
      
    event.preventDefault();
    this.setState( {search: event.target.value} );
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.search)

    API.findByName(this.state.search)
      .then(res =>
        this.setState({ dishes: res.data })
      )
      .catch(err => console.log(err.response.data));
  };

  render() {
    if (!this.state.isloggedIn) {
      return (
        <div className="searchFeed">
          <Container fluid>
              <h3>Search for a dish name</h3>
          <form onSubmit={this.handleSubmit}>
          <input name="user" type="text" value={this.state.value} onChange={this.handleInputChange} required />
              <Button type="submit" value="Submit" variant="primary" onClick={this.handleFormSubmit}>
                Submit
              </Button>
          </form>
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
                    tags={dish.tags}
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
                <h3>No Results to Display</h3>
              )}
          </Container>
        </div>
      );
    } else {
      return (
        <div className="searchFeed">
          <Container fluid>
          <form onSubmit={this.handleSubmit}>
          <input name="user" type="text" value={this.state.value} onChange={this.handleInputChange} required />
              <Button type="submit" value="Submit" variant="primary" onClick={this.handleFormSubmit}>
                Submit
              </Button>
          </form>
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
                    tags={dish.tags}
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
                <h3>No Results to Display</h3>
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

export default Search;