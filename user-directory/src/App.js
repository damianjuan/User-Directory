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
  // when table component mounts get employees from API and assign to results and displayedResults. results is immutable. this prevents having to make an api call every time there is a need to go back to the full list of employees
  componentDidMount() {
    API.getUsers()
      .then(res => this.setState({ results: res.data.results, displayedResults: res.data.results }))
      .catch(err => console.log(err));
  };

  //update state with user input as it changes. filter display based on search as user types. need to add debounce for performance 
  handleInputChange = event => {
    // Getting the value of the input which triggered the change
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

  //when search input is cleared set displayResults back to original list of employee
  handleClearInput = () => {
    this.setState({ displayedResults: this.state.results })
  }

  //sort table by first name
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
          onClick={this.handleClearInput} />
        <EmployeeTable
          sortByFirstName={this.sortByFirstName}
          results={this.state.displayedResults}
        />
      </>
    )
  }
};

export default App;
