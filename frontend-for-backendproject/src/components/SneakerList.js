import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography , AppBar} from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopDrawer from "./TopDrawer";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SneakerList = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [sneakers, setSneaker] = useState([]);

    const handleUpdateClick = (id) => {
        navigate(`/sneakers/edit/${id}`);
    };
    const handleDeleteClick = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3030/sneakers/${id}`);
                getSneakersItems();
            } catch (e) {
                console.log(e);
            }
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "sneakerName", headerName: "Name", width: 250 },
        { field: "brand", headerName: "Email", width: 150 },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 40,
        },
        { field: "description", headerName: "Desc", width: 450 },
        {
            field: "imageUrl",
            headerName: "Image",
            width: 150,
            editable: true,
            renderCell: (params) => (
                <Avatar
                    variant="square"
                    src={params.value}
                    sx={{ width: 118, height: 118 }}
                />
            ),
        },
        {
            field: "action",
            headerName: "Actions",
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateClick(params.row.id)}
                >
                    Update
                </Button>
            ),
        },
        {
            field: "action2",
            headerName: "",
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(params.row.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        refreshToken().then(getSneakersItems);
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:3030/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    };

    const axiosJWT = axios.create();

    const getSneakersItems = async () => {
        const response = await axiosJWT.get("http://localhost:3030/sneakers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setSneaker(response.data);
        console.log(response.data);
    };

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get("http://localhost:3030/token");
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (
        <>
            <TopDrawer/>
            <div style={{ height: 400, width: "100%" }}>
                <Typography variant="h6" sx={{ marginLeft: 5 }}>
                    Hello {name}, here is the
                </Typography>
                <Typography variant="h3" sx={{ marginLeft: 5 }} color="green">
                    Sneakers List
                </Typography>
                <Button
                    onClick={() => navigate("/sneakers/add")}
                    variant="contained"
                    color="success"
                    sx={{
                        marginLeft: 5,
                        marginTop: 5,
                    }}
                >
                    Add Sneaker
                </Button>
                <DataGrid
                    rowHeight={100}
                    sx={{
                        margin: 5,
                    }}
                    rows={sneakers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                />
            </div>
        </>
    );
};

export default SneakerList;
