import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import WebhookIcon from '@mui/icons-material/Webhook';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
// import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions, TopNavPages, settings } from '../Config';
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
            <Container maxWidth="100%" sx={{ backgroundColor: '#17021e' }}>
                <Toolbar disableGutters>
                    {/* logo text */}
                    <Link to='/' style={{ textDecoration: 'none', color: '#ddc8b3' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', sm: 'none', md:'flex', lg: 'flex' },
                                fontFamily: 'Oswald, sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                padding: '10px',
                            }}
                            >
                            DevQuest
                            <WebhookIcon sx={{padding:'4px'}}/>
                        </Typography>
                    </Link>
                    {/* hamburger */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'block', lg: 'none' },
                            }}
                        >
                            {TopNavPages.filter(p => !p.permissions || checkPermissions(p.permissions)).map((page) => (
                                <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
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
                            fontSize: "18px",
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    > {/* and media screen logo name */}
                        DevQuest
                        <WebhookIcon sx={{paddingLeft:'2px', fontSize:"24px"}}/>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none',md:"flex", lg: 'flex' } }}>
                        {TopNavPages.filter(p => !p.permissions || checkPermissions(p.permissions)).map((page) => (
                            <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    variant='h5'
                                    sx={{ my: 2, color: 'white', display: 'block', margin: "4px", fontFamily: "Oswald, sans-serif", fontSize: "14px", backgroundColor:'#1B1212' ,
                                    boxShadow:page.route === path ? '0px 0px 8px 4px #613789' : '' }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* <ToggleTheme /> */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Personal Hub">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <PersonIcon sx={{ color: 'white', fontSize: '30px' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map(setting => {
                                return (
                                    setting.permissions.includes() && <Link to={setting.route} key={setting.route} style={{ textDecoration: 'none', color: 'initial' }} >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                )
                            })}
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'initial' }} >
                                <MenuItem >
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}