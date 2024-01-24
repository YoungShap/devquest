import * as React from 'react';
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
import { useState } from 'react';
import Joi from 'joi';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';


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


export default function EmailReset() {
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = React.useState({});
    const [formData, setFormData] = useState({
        email: '',
    });
    const { snackbar, setIsLoading } = React.useContext(GeneralContext);

    const loginSchema = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:4000/auth/forgotpassword`, // Update the URL to your forgot password endpoint
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                snackbar("You will receive a Password reset link.");
                navigate("/login");
                setIsLoading(false);
            } else {
                snackbar("there was an error, please try again");

            }
        } catch (err) {
            snackbar(err);
        }
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: "black" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography style={{ color: 'white' }} component="h1" variant="h5">
                        Provide Account Email To Reset
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
                        <Button style={{ color: 'white', backgroundColor: 'black' }}
                        disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Reset Link
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"I Remember, Let Me Login Please!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}