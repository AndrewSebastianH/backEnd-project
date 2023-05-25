import React, {useState, useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid'

import {getSneakersItems} from "../data/SneakersData";
import {Avatar, Typography} from "@mui/material";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import TopDrawer from "./TopDrawer";

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'sneakerName', headerName: 'Name', width: 250},
    {field: 'brand', headerName: 'Email', width: 150},
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 40,
    },
    {field: 'description', headerName: 'Desc', width: 450},
    {
        field: 'imageUrl',
        headerName: 'Image',
        width: 150,
        editable: true,
        renderCell: (params) => <Avatar variant="square" src={params.value} sx={{width: 118, height: 118}}/>, // renderCell will render the component
    },
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

const SneakerList = () => {
    const navigate = useNavigate();

    const [sneakers, setSneaker] = useState([]);

    useEffect(() => {
        getSneakersItems().then(json => {
            setSneaker(json)
        })
    }, []);
    console.log(sneakers)
    return (
        <>
            <TopDrawer/>
            <div style={{height: 400, width: '100%'}}>
                <Typography variant="h3" sx={{marginLeft: 5}}>Sneakers List</Typography>
                <Button
                    onClick={() => navigate('/add')}
                    variant="contained"
                    color="success"
                    sx={{
                        marginLeft: 5,
                        marginTop: 5
                    }}
                >
                    Add Sneaker
                </Button>
                <DataGrid
                    rowHeight={100}
                    sx={{
                        margin: 5
                    }}
                    rows={sneakers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </>
    );
}

export default SneakerList;