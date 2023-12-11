import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { structure } from '../Config';
import { GeneralContext } from '../App';

const defaultTheme = createTheme();
export default function EditUsers() {
    const { id } = useParams();
    const { user, setUser } = useContext(GeneralContext);
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

    useEffect(() => {
        fetch(`http://localhost:4000/auth/users/${id}`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
    }, []);

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
        console.log(formData);
        // setErrors(err);
    };

    const save = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:4000/auth/admin/users/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.token,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Error updating user");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };
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
                        Edit Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={save} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                                    onChange={handleInputChange}
                                    autoComplete="given-name"
                                    value={formData.firstName}
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
                                        <TextField sx={{ backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                                            onChange={handleInputChange}
                                            name={item.name}
                                            type={item.type}
                                            required={item.required}
                                            fullWidth
                                            id={item.name}
                                            label={item.label}
                                            value={formData[item.name]}
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
                            Save Changes
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