import React, { Component } from 'react';
import './App.css';
import SearchAppBar from './components/testHeader';
import EmployeeTable from './components/Table';
import API from './utils/API'

//class component to access input 
class App extends Component {
  state = {
    results: [],
    displayedResults: [],
    userInput: ""
  };
  // when table component mounts get employees from API and assign to results state
  componentDidMount() {
    API.getUsers()
      .then(res => this.setState({ results: res.data.results, displayedResults: res.data.results }))
      .catch(err => console.log(err));
  };

  //update state with user input as it changes. must do so that userInput state is set before handleFormSubmit fires or the search wont be complete
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    event.preventDefault();
    let value = event.target.value;
    const regexp = new RegExp(value, 'i');
    const displayedResults = this.state.results.filter(el =>
      regexp.test(el.name.first)
      || regexp.test(el.name.last)
      || regexp.test(el.name.last)
      || regexp.test(el.phone)
      || regexp.test(el.email)
      || regexp.test(el.location.city)
      || regexp.test(el.location.state)
    );
    this.setState({ displayedResults })
  };

  sortByFirstName = () => {
    const displayedResults = this.state.displayedResults.sort(compare)
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
    this.setState({ displayedResults })
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
          results={this.state.displayedResults}
        />
      </>
    )
  }
};

export default App;
