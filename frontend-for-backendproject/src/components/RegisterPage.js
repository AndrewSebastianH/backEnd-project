import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const defaultTheme = createTheme();

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3030/users',{
                name: name,
                email:email,
                password:password,
                confPassword: confPassword
            });
            navigate("/");
        }catch (error) {
            if(error.response){
                setErrMsg(error.response.data.msg);
            }
        }
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
    };

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
                        Register dulu gak sih
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography
                            sx={{
                                color: 'red'
                            }}
                        >
                            {errMsg}
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confPassword"
                            value={confPassword}
                            onChange={(e)=> setConfPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Have an account? Login here"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}