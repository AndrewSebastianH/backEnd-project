import React, {useState, useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid'
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import TopDrawer from "./TopDrawer";



const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 170},
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'createdAt', headerName: 'Created At', width: 250},
    {field: 'updatedAt', headerName: 'Last Updated', width: 250},
];

const UserList = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    // kalo ini buat naro data user dari databasenya ke array
    const [users, setUsers] = useState([]);

    useEffect(() => {
        refreshToken().then(getUsersItems);
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3030/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log(decoded);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }


    const axiosJWT = axios.create();

    const getUsersItems = async () => {
        const response = await axiosJWT.get('http://localhost:3030/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUsers(response.data)
        console.log(response.data)
    }

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:3030/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    })
    // console.log(sneakers)
    return (
        <>
            <TopDrawer/>
            <div style={{height: 400, width: '100%'}}>
                <Typography variant="h6" sx={{marginLeft: 5}}>Halo {name}, here is the</Typography>
                <Typography variant="h3" sx={{marginLeft: 5}}>Users List</Typography>
                <DataGrid
                    rowHeight={100}
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
                    disableRowSelectionOnClick
                />
            </div>
        </>
    );
}

export default UserList;