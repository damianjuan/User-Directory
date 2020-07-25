import React, { Component } from 'react';
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Avatar } from '@material-ui/core';
import API from '../../utils/API'

// //test data for testing table generation
// function createData(name, number, email, location) {
//     return { name, number, email, location };
// }
// //test data
// const rows = [
//     createData('Test One', 8165555555, 'one@email.com', 'kc'),
//     createData('Test Two', 4095555555, 'two@email.com', 'galveston'),
// ];

class EmployeeTable extends Component {
    state = {
        results: [],
        search: ""
    };

    // when table component mounts get employees from API and assign to results state
    componentDidMount() {
        API.getUsers()
            .then(res => this.setState({ results: res.data.results }))
            .catch(err => console.log(err));

    }

    render() {
        const rows = this.state.results;
        return (

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ?

                            rows.map((res) => (
                                <TableRow key={res.id.value}>
                                    <TableCell component="th" scope="rows">
                                        <Avatar alt={res.name.first} src={res.picture.thumbnail} />
                                    </TableCell>
                                    <TableCell align="right">{res.name.first} {res.name.last}</TableCell>
                                    <TableCell align="right">{res.phone}</TableCell>
                                    <TableCell align="right">{res.email}</TableCell>
                                    <TableCell align="right">{res.location.city},    {res.location.state}</TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell align="center" >Loading</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
};

export default EmployeeTable;