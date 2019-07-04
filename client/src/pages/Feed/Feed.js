import React, { Component } from "react";
import PostCard from "../../components/PostCard";
import API from "../../utils/API";
import { Container } from "react-bootstrap";
// import { Input, TextArea, FormBtn } from "../../components/Form";
// import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";



class Feed extends Component {
  // Setting our component's initial state
  state = {
    dishes: [],
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadDishes();
  }

  // Loads all books  and sets them to this.state.books
  loadDishes = () => {
    API.getDishes()
      .then(res =>
        this.setState({ dishes: res.data })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteDish = id => {
    API.deleteDish(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
//   handleFormSubmit = event => {
//     event.preventDefault();
//     if (this.state.title && this.state.author) {
//       API.saveBook({
//         title: this.state.title,
//         author: this.state.author,
//         synopsis: this.state.synopsis
//       })
//         .then(res => this.loadBooks())
//         .catch(err => console.log(err));
//     }
//   };

  render() {
    return (
      <Container fluid>
            {this.state.dishes.length ? (
              <Container>
                {this.state.dishes.map(dish => {
                  return (
                    <PostCard key={dish._id}>
                    </PostCard>
                  );
                })}
              </Container>
            ) : (
              <h3>No Results to Display</h3>
            )}
        
      </Container>
    );
  }
}

export default Feed;