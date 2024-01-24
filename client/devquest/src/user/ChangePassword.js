import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { structure, ChangePasswordSchema } from "./ChangePassConfig";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from '../App';
import '../CRUD/FormBtn.css'

const defaultTheme = createTheme();

const ChangePassword = () => {
    const { user, snackbar } = useContext(GeneralContext);
    const navigate = useNavigate();

    const initializeUserData = () => ({
        password: "",
        newPassword: "",
    });

    const [userData, setUserData] = useState(initializeUserData);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setUserData({ ...userData, [name]: value });
        setHasInteracted(true);
    };

    useEffect(() => {
        // Only perform validation if the user has interacted with the input fields
        if (hasInteracted) {
            const validationResults = ChangePasswordSchema.validate(userData, {
                abortEarly: false,
                allowUnknown: true,
            });

            const newErrors = {};
            if (validationResults.error) {
                validationResults.error.details.forEach((error) => {
                    if (error.path && error.path.length > 0) {
                        newErrors[error.path[0]] = error.message;
                    }
                });
            }

            setErrors(newErrors);
            setIsValid(Object.keys(newErrors).length === 0);
        }
    }, [userData, hasInteracted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:4000/auth/users/password/${user._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.token,
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (response.ok) {
                snackbar("Password Changed successfully!");
                navigate("/");
            } else {
                const errorMessage = await response.text();
                snackbar("Error updating password:");
            }
        } catch (error) {
            snackbar("Error:", error);
        }
    };

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ mt: 0, mb: 2, bgcolor: "secondary.main", backgroundColor: 'black' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                                Change Password
                            </Typography>
                            {user && (
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    sx={{ mt: 3 }}
                                >
                                    <Grid container spacing={2}>
                                        {structure.map((s) => (
                                            <Grid key={s.name} item xs={s.block ? 12 : 6}>
                                                <TextField
                                                    name={s.name}
                                                    value={userData[s.name]}
                                                    required={s.required}
                                                    fullWidth
                                                    id={s.name}
                                                    label={s.label}
                                                    type={
                                                        s.type === "password" && !passwordVisibility[s.name]
                                                            ? "password"
                                                            : "text"
                                                    }
                                                    sx={{ mt: 0, mb: 3, backgroundColor: 'black', input: { color: 'white' }, label: { color: 'white' }, borderRadius: '5px' }}
                                                    error={!!errors[s.name]}
                                                    helperText={errors[s.name] || ""}
                                                    onChange={handleInputChange}
                                                    InputProps={{
                                                        endAdornment:
                                                            s.type === "password" ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            togglePasswordVisibility(s.name)
                                                                        }
                                                                        edge="end"
                                                                    >
                                                                        {passwordVisibility[s.name] ? (
                                                                            <Visibility style={{ color: "white" }} />
                                                                        ) : (
                                                                            <VisibilityOff style={{ color: "white" }} />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ) : null,
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Button
                                        className={`button ${isValid ? "valid" : ""}`}
                                        disabled={!isValid}
                                        style={{ display: isValid ? "none" : "", color: "red", fontWeight: "bold" }}
                                        sx={{
                                            mt: 4,
                                            mb: 2,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",

                                        }}
                                    >
                                        <span className="spin"></span>
                                        {isValid ? "Valid" : "Finish the required field..."}
                                    </Button>

                                    <Button style={{ backgroundColor: 'black', color: 'white' }}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2, mb: 5, textAlign: "center" }}
                                        disabled={!isValid}
                                    >
                                        Change my password
                                    </Button>
                                    <Grid container justifyContent="center"></Grid>
                                </Box>
                            )}
                        </Box>
                    </Container>
                </ThemeProvider>
    );
};


export default ChangePassword;