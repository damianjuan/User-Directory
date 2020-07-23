import React, { Component } from 'react';
import './App.css';
import SearchAppBar from './components/testHeader/index';

//class component to access input 
class App extends Component {
  state = {
    userInput: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    //updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.userInput) {
      alert("Enter a search term before submitting.");
    } else {
      alert("form submitted");
      console.log(this.state.userInput);
    }
    this.setState({
      userInput: ""
    });
  };

  render() {
    return (
      <div>
        <SearchAppBar />
      </div >
    );
  }
}

export default App;
