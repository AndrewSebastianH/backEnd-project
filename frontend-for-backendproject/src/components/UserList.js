import React, {useState, useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid'

import {getUsersItems} from "../data/UsersData";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 170},
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'gender', headerName: 'Gender', width: 90},
    {
        field: "action",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {

            };

            return <Button variant='contained' color='success' onClick={onClick}>Update</Button>;
        }
    },
    {
        field: "action2",
        headerName: "",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {

            };

            return <Button variant='contained' color='error' onClick={onClick}>Delete</Button>;
        }
    },
];
const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsersItems().then(json => {
            setUser(json)
        })
    }, []);
    console.log(users)
    return (
        <div style={{height: 400, width: '100%'}}>
            <Typography variant="h3" sx={{marginLeft: 5}}>Users List</Typography>
            <DataGrid
                sx={{
                    margin: 5
                }}
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default UserList;