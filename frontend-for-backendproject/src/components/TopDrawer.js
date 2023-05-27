import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom'

const TopDrawer = () => {
    const navigate = useNavigate();
    const logout = async() => {
        try{
            await axios.delete('http://localhost:3030/logout');
            navigate("/");
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: '#292b2c' }}>
                <Container maxWidth="xl">
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                            Backend Project
                        </Typography>
                        <div>
                            <Button
                                color="inherit"
                                style={{ marginRight: '1rem' }}
                                component={Link} to="/sneakers"
                            >
                                Sneakers
                            </Button>
                            <Button
                                color="inherit"
                                style={{ marginRight: '1rem' }}
                                component={Link} to="/users"
                            >
                                Users
                            </Button>
                            <Button
                                color="inherit"
                                style={{ marginRight: '1rem' }}
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default TopDrawer;
