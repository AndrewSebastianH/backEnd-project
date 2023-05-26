import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import {Button} from "@mui/material";

import {Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const Logout = async() =>{
        try{
            await axios.delete('https://localhost:3030/logout')
            navigate('/')
        }catch (error){
            console.log(error)
        }
    }
    return (
        <Box
            minWidth='100%'
            sx={{
                position: 'fixed',
            }}
        >
            <Box
                display='flex'
                justifyContent='flex-end'
            >
                <Button
                    color="success"
                    variant="contained"
                    onClick={toggleDrawer}
                    sx={{
                        borderRadius: 35,
                        padding: 4.5,
                        margin: 6,
                        width: 60,
                        height: 60
                    }}
                >
                    <MenuIcon sx={{fontSize: 35, color: 'white'}}/>
                </Button>
            </Box>
            <Drawer
                sx={{
                    height: '100%',
                    top: 0,
                    left: 0,
                    position: 'fixed',
                }}
                anchor="top"
                open={isOpen}
                onClose={toggleDrawer}
            >
                <Box>
                    <Toolbar
                        sx={{
                            height: 170,
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#606c38',
                                marginRight: "auto"
                            }}
                        >
                            <h2>Backend Project Sneaker Shop</h2>
                        </Typography>

                        <Link
                            to="/sneakers"
                            style={{textDecoration: "none"}}
                        >
                            <Button
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <RestaurantMenuIcon
                                    sx={{
                                        fontSize: 50,
                                        color: '#606C38'
                                    }}
                                />
                                <Typography
                                    sx={{
                                        px: 2,
                                    }}
                                >
                                    <h2>Sneakers</h2>
                                </Typography>
                            </Button>
                        </Link>
                        <Divider/>
                        <Link
                            to="/users"
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <Button
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <ShoppingBasketIcon
                                    sx={{
                                        fontSize: 50,
                                        color: '#606C38'
                                    }}
                                />
                                <Typography
                                    sx={{
                                        px: 5,
                                    }}
                                >
                                    <h2>Users</h2>
                                </Typography>
                            </Button>
                        </Link>
                        <Divider/>
                        <Button
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={Logout}
                        >
                            <ExitToAppIcon
                                sx={{
                                    fontSize: 50,
                                    color: '#606C38',

                                }}
                            />
                            <Typography
                                sx={{
                                    px: 5,
                                }}
                            >
                                <h2>Logout</h2>
                            </Typography>
                        </Button>
                    </Toolbar>
                </Box>
            </Drawer>
        </Box>
    );
};

export default TopDrawer;