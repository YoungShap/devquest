import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { accountStructure, editAccSchema } from '../Config';
import { GeneralContext } from '../App';

const defaultTheme = createTheme();
export default function Account() {
  const { user, setUser, snackbar } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    devName: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    if (user) {
      setFormData(user);
    } else {
      snackbar('Error, No User Found!');
    }
    // setIsLoading(false);
  }, [user])

  const handleInputChange = ev => {
    const { id, value } = ev.target;
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [id]: value,
      };
      const schema = editAccSchema.validate(updatedFormData, { abortEarly: false, allowUnknown: true });
      const err = {};

      if (schema.error) {
        schema.error.details.forEach((error) => {
          err[error.context.key] = error.message;
        });
        setIsValid(false);
      } else {
        setIsValid(true);
      }

      setErrors(err);

      return updatedFormData;
    });
  };

  const save = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/auth/users/edit/${user._id}`,
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
      snackbar(error.message)
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
                {errors.firstName ? <div style={{ color: '#d12c2c' }} className='fieldError'>{errors.firstName}</div> : ''}
              </Grid>
              {
                accountStructure.map(item =>
                  <Grid key={item.name} item xs={12} sm={item.block ? 3 : 12}>
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
                    {errors[item.name] ? <div style={{ color: '#d12c2c' }} className='fieldError'>{errors[item.name]}</div> : ''}
                  </Grid>)
              }
            </Grid>
            <Button style={{ backgroundColor: '#121010', color: 'white', marginBottom:'-12px' }}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button >
            <Button style={{ backgroundColor: '#121010', color: 'white' }}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/')}>
              Cancel
            </Button >
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}