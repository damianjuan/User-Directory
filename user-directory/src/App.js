import React, { Component } from 'react';
import './App.css';
import SearchAppBar from './components/testHeader';
import EmployeeTable from './components/Table';
import API from './utils/API'

//class component to access input 
class App extends Component {
  state = {
    results: [],
    userInput: "default"
  };
  // when table component mounts get employees from API and assign to results state
  componentDidMount() {
    this.getEmployees();
  };

  // function to make api call
  getEmployees() {
    API.getUsers()
      .then(res => this.setState({ results: res.data.results }))
      .catch(err => console.log(err));
  }

  //update state with user input as it changes. must do so that userInput state is set before handleFormSubmit fires or the search wont be complete
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    event.preventDefault();
    let value = event.target.value;
    const name = event.target.name;
    //updating the input's state
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value,
    });
    console.log(this.state.userInput)
  };

  //search employees. regexp allows search for exact and partial matches without the need to convert all to upper or lower etc. 
  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.userInput) {
      alert("Enter a search term before submitting.");
    } else {
      console.log(this.state.userInput);
      const searchTerm = this.state.userInput;
      const toFilter = this.state.results;
      const regexp = new RegExp(searchTerm, 'i');
      console.log(toFilter)
      const filteredResults = toFilter.filter(el =>
        regexp.test(el.name.first)
        || regexp.test(el.name.last)
        || regexp.test(el.name.last)
        || regexp.test(el.phone)
        || regexp.test(el.email)
        || regexp.test(el.location.city)
        || regexp.test(el.location.state)
      );

      this.setState({ results: filteredResults })
    }
    //empty the search field after search complete
    this.setState({
      userInput: ""
    });
  };

  sortByFirstName = () => {
    let firstNameSort = this.state.results.sort(compare)
    function compare(a, b) {
      const nameA = a.name.first;
      const nameB = b.name.first;
      if (nameA > nameB) {
        return 1;
      } else if (nameA < nameB) {
        return -1
      } else if (nameA === nameB) {
        return 0;
      }
    }
    this.setState({ result: firstNameSort })
  }


  render() {
    return (

      <>
        <SearchAppBar
          onChange={this.handleInputChange}
          onSubmit={this.handleFormSubmit}
          state={this.state}
          sortByFirstName={this.sortByFirstName}
          onClick={this.getEmployees} />
        <EmployeeTable
          sortByFirstName={this.sortByFirstName}
          results={this.state.results}

        />
      </>
    )

  }
};

export default App;
