import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function AddSneaker() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3030/sneakers',{
                sneakerName,
                brand,
                price,
                description,
                imageUrl
            });
            navigate('/sneakers')
        } catch (error) {

        }
    };

    const [sneakerName, setSneakerName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <DoNotStepIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add a new Sneaker
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sneakerName"
                            label="Sneaker Name"
                            name="sneakerName"
                            value={sneakerName}
                            onChange={(e)=> setSneakerName(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="brand"
                            label="Brand Name"
                            name="brand"
                            value={brand}
                            onChange={(e)=> setBrand(e.target.value)}
                            autoFocus
                        />
                        <FormControl fullWidth sx={{ marginTop: 1}}>
                            <InputLabel>Price</InputLabel>
                            <OutlinedInput
                                id="price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Price"
                                value={price}
                                onChange={(e)=> setPrice(e.target.value)}
                            />
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="imageUrl"
                            label="Image Url Link"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={(e)=> setImageUrl(e.target.value)}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Sneaker
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}