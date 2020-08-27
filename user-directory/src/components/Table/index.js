import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow, Avatar, TableSortLabel } from '@material-ui/core';
import App from '../../App';

//used class to store state
function EmployeeTable({ results, sortByFirstName }) {

    const rows = results;

    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">
                            <TableSortLabel

                                direction={'des'}
                                onClick={sortByFirstName}

                            >Name</TableSortLabel></TableCell>
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
};

export default EmployeeTable;