import React, { Component } from 'react';
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Avatar, TableSortLabel } from '@material-ui/core';
import API from '../../utils/API'

//used class to store state
class EmployeeTable extends Component {
    state = {
        results: [],
        userInput: ""
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
        this.setState({
            [name]: value
        });
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
            // const filteredResults = toFilter.filter(function (el) {
            //     return el.name.first === searchTerm
            //         || el.name.last === searchTerm
            //         || el.email === searchTerm
            //         || el.phone === searchTerm
            // });
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
        const rows = this.state.results;
        return (



            <TableContainer component={Paper} >
                <form className="form-inline" style={{ marginTop: "5px", marginLeft: "5px" }} >
                    <input
                        className="form-control mr-sm-2 m1"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        name="userInput" />
                    <button
                        className="btn btn-outline-primary my-2 my-sm-0"
                        type="submit"
                        onClick={this.handleFormSubmit}
                    >Search</button>
                    <button
                        className="btn btn-outline-primary my-2 my-sm-0"
                        type="submit"
                        onClick={this.getEmployees}
                        style={{ marginLeft: "8px" }}
                    >Show All Employees</button>
                </form>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left"><TableSortLabel onClick={this.sortByFirstName}>Name</TableSortLabel></TableCell>
                            <TableCell align="left">Phone Number</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Location</TableCell>
                        </TableRow>
                    </TableHead >
                    <TableBody>
                        {rows.length ?

                            rows.map((res) => (
                                <TableRow key={res.id.value}>
                                    <TableCell component="th" scope="rows">
                                        <Avatar alt={res.name.first} src={res.picture.thumbnail} />
                                    </TableCell>
                                    <TableCell align="left">{res.name.first} {res.name.last}</TableCell>
                                    <TableCell align="left">{res.phone}</TableCell>
                                    <TableCell align="left">{res.email}</TableCell>
                                    <TableCell align="left">{res.location.city},    {res.location.state}</TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell align="center" colSpan={5}>No results found</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table >
            </TableContainer >

        )
    }
};

export default EmployeeTable;