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
        newPassword: '',
        confirmNewPassword: '',
    });
    const { snackbar, setIsLoading } = React.useContext(GeneralContext);

    const passSchema = Joi.object({
        newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
            .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),

        confirmNewPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/).message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*')
            .valid(Joi.ref("newPassword"))
            .messages({
                "any.only": "Passwords do not match",
                "string.min":
                    "Confirm New Password should have a minimum length of {#limit} characters",
                "string.max":
                    "Confirm New Password should have a maximum length of {#limit} characters",
                "string.pattern.lowercase":
                    "New Password should contain a lowercase letter",
                "string.pattern.uppercase":
                    "New Password should contain an uppercase letter",
                "string.pattern.digit": "New Password should contain a digit",
                "string.pattern.specialCharacter":
                    "New Password should contain a special character ($, @, $, !, #)",
                "any.required": "Confirm New Password cannot be empty",
            }),
    });

    const handleInputChange = ev => {
        const { id, value } = ev.target;
        let obj = {
            ...formData,
            [id]: value,
        };
        const schema = passSchema.validate(obj, { abortEarly: false });
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
        // Extract the token from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        try {
            const response = await fetch(
                `http://localhost:4000/auth/resetpassword`, // Update the URL to your forgot password endpoint
                {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: token, resetPassword: formData.confirmNewPassword }),
                }
            );

            if (response.ok) {
                snackbar("Password Changed Successfully.");
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
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            type='password'
                            id="newPassword"
                            label="New Password"
                            name="newPassword"
                            autoFocus
                        />
                        {errors.newPassword ? <div style={{ color: '#c92626' }} className='fieldError'>{errors.newPassword}</div> : ''}
                        <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            type='password'
                            id="confirmNewPassword"
                            label="Re-Enter Password"
                            name="confirmNewPassword"
                            autoFocus
                        />
                        {errors.confirmNewPassword ? <div style={{ color: '#c92626' }} className='fieldError'>{errors.confirmNewPassword}</div> : ''}
                        <Button disabled={!isValid} style={{ color: 'white', backgroundColor: 'black' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
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