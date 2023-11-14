import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import WebhookIcon from '@mui/icons-material/Webhook';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
// import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions, pages, settings } from '../Config';
// import ToggleTheme from './ToggleTheme';


export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const path = useResolvedPath().pathname;
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="100%" sx={{ backgroundColor: '#0c0c0c' }}>
                <Toolbar disableGutters>
                    {/* logo text */}
                    <Link to='/' style={{ textDecoration: 'none', color: '#ddc8b3' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', sm: 'none', lg: 'flex' },
                                fontFamily: 'Oswald, sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                padding: '10px',
                            }}
                            >
                            <WebhookIcon sx={{padding:'4px'}}/>
                        </Typography>
                    </Link>
                    <Typography style={{ textDecoration: 'none', color: '#ddc8b3'}}
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
                            fontFamily: 'Oswald, sans-serif',
                            fontWeight: 700,
                            fontSize: "30px",
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    > {/* and media screen logo name */}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md:'flex', lg: 'flex' },overflowX:'auto' }}>
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions)).map((page) => (
                            <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    variant='h5'
                                    sx={{ my: 2, color: 'white', display: 'block', margin: "8px", fontFamily: "Oswald, sans-serif", fontSize: "15px", backgroundColor:'none' ,
                                    boxShadow:page.route === path ? '0px 0px 8px 4px #613789' : '' }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* <ToggleTheme /> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}