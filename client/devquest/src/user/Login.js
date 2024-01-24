import * as React from 'react';
import '../CRUD/Form.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GeneralContext } from '../App';
import { RoleTypes } from '../Config';
import Joi from 'joi';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ color: '#ddc8b3', marginTop: '18px' }}>
            {'Copyright © '}
            <Link color="inherit">
                Aviv Shapira
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function Login() {
    const { setUser, setRoleType, snackbar } = React.useContext(GeneralContext);
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const loginSchema = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
            .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
    });

    const handleInputChange = ev => {
        const { id, value } = ev.target;
        let obj = {
            ...formData,
            [id]: value,
        };
        const schema = loginSchema.validate(obj, { abortEarly: false });
        const err = { ...errors, [id]: undefined };

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
                err[id] = error.message;
            }
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        setFormData(obj);
        setErrors(err);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:4000/auth/login", {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setUser(data);
                localStorage.token = data.token;
                if (data.type === 'Dev') {
                    setRoleType(RoleTypes.dev);
                } else if (data.type === 'Admin') {
                    setRoleType(RoleTypes.admin);
                } else {
                    setRoleType(RoleTypes.none);
                }
                snackbar(`${data.devName} Is Connected`);
                navigate('/');

            })
            .catch(err => {
                snackbar(err.message);
            });
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'black' }} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }} >
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {errors.email ? <div style={{ color: '#c92626' }} className='fieldError'>{errors.email}</div> : ''}
                        <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errors.password ? <div style={{ color: '#c92626' }} className='fieldError'>{errors.password}</div> : ''}
                        <Button style={{ backgroundColor: 'black', color: 'white' }}
                            disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link style={{fontSize:"18px", fontWeight:'bold', color:"#43c900"}} href="/email" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2" sx={{ color: '#ddc8b3', textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}