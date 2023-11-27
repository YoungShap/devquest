import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { GeneralContext } from '../App';
import { useContext, useState } from 'react';
import { structure } from '../Config';

const defaultTheme = createTheme();
export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        devName: '',
        password: '',
    });
    const navigate = useNavigate();
    //   const [errors, setErrors] = useState({});
    //   const [isValid, setIsValid] = useState(false);


    const handleInputChange = ev => {
        const { id, value } = ev.target;
        let obj = {
            ...formData,
            [id]: value,
        };
        // const schema = signupSchema.validate(obj, { abortEarly: false });
        // const err = { ...errors, [id]: undefined };

        // if (schema.error) {
        //   const error = schema.error.details.find(e => e.context.key === id);

        //   if (error) {
        //     err[id] = error.message;
        //   }
        //   setIsValid(false);
        // } else {
        //   setIsValid(true);
        // } 

        setFormData(obj);
        // setErrors(err);
    };

    function signup(ev) {
        ev.preventDefault();
        fetch("http://localhost:4000/auth/signup", {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                        .then(() => {
                            //   snackbar("User was created successfully")
                            navigate('/login');
                        })
                } else {
                    return res.text()
                        .then(x => {
                            throw new Error(x);
                        });
                }
            })
            .catch(err => {
               console.log(err);
            })
            .finally(() => {
                // setIsLoading(false);
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={signup} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handleInputChange}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                                {/* {errors.firstName ? <div className='fieldError'>{errors.firstName}</div> : ''} */}
                            </Grid>
                            {
                                structure.map(item =>
                                    <Grid key={item.name} item xs={12} sm={item.block ? 6 : 12}>
                                        <TextField
                                            onChange={handleInputChange}
                                            name={item.name}
                                            type={item.type}
                                            required={item.required}
                                            fullWidth
                                            id={item.name}
                                            label={item.label}
                                        />
                                        {/* {errors[item.name] ? <div className='fieldError'>{errors[item.name]}</div> : ''} */}
                                    </Grid>)
                            }
                        </Grid>
                        <Button style={{ backgroundColor: '#121010', color: 'white' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button >
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/login" style={{ color: '#ffffea' }}>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}