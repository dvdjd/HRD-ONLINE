import React, { useState } from 'react'
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
import logo from '../style/images/nmcp-logo.png'
import TopNavCSS from './TopNav.module.css'

import Popper from '@mui/material/Popper';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 200, md: 400},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,

};
const TopNav = () => {
    const pages = [
        {
            name: 'NMCP Company', hasSubPages: true,
            subPages: [
                {subName: 'Company Profile', link: '/', target: '_blank'},
                {subName: 'Organization Chart', link: '/', target: '_blank'},
                {subName: 'Corporate Vision & Mission', link: '/', target: '_blank'},
                {subName: 'Mission', link: '/', target: '_blank'},
                {subName: 'Vision', link: '/', target: '_blank'},
                {subName: 'Corporate Values', link: '/', target: '_blank'},
                {subName: 'Company Rules and Regulations', link: '/', target: '_blank'},
                {subName: 'Policies', link: '/', target: '_blank'},
                {subName: 'WW Calendar0', link: '/', target: '_blank'},
                {subName: 'WW Calendar', link: '/', target: '_blank'},
                {subName: 'Quality', link: '/', target: '_blank'},
            ]
        },
        {
            name: 'Recruitment / Training', link: '/', target: '_self', hasSubPages: false, subPages: []
        },
        {
            name: 'CompBen', hasSubPages: true,
            subPages: [
                {subName: 'Compensation / Benifits', link: '/', target: '_blank'},
                {subName: 'Promotions', link: '/', target: '_blank'},
                {subName: 'Government Updates', link: '/', target: '_blank'},
                {subName: 'Intranet Online Filing', link: 'http://192.168.4.9:90/ApplyOT.aspx', target: '_blank'},
            ]
        },
        {
            name: 'Procedure, Guidelines & Forms', link: '/', target: '_self', hasSubPages: false, subPages: []
        },
        {
            name: 'Environmental', link: '/', target: '_self', hasSubPages: false
        },
        {
            name: 'Activities / Programs', link: '/', target: '_self', hasSubPages: false
        },
        {
            name: 'Galleries', link: '/galleries', target: '_self', hasSubPages: false
        },
    ];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [subPages, setSubPages] = useState([])
    const handleSetSubPages = (index) => {
        pages[index].hasSubPages ? setSubPages(pages[index].subPages) : setSubPages([])
    }
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
    /*-----------------SubPages Modal----------------------*/
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    /*-----------------Login------------------------------*/
    const [openLogin, setOpenLogin] = useState(false);
    const handleOpen = () => setOpenLogin(true);
    const handleClose = () => setOpenLogin(false);
    return (
        <>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openLogin}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openLogin}>
                        <Card sx={style}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircle sx={{ color: '#1976d2', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" label="Enter Pin..." variant="standard" sx={{width: '100%'}}/>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 4}}>
                                    <LockIcon sx={{ color: '#1976d2', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" label="Enter Password..." variant="standard" type="password" sx={{width: '100%'}}/>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" sx={{width: '100%'}} variant="contained" disableElevation onClick={() => {alert("yawa")}}>Login</Button>
                            </CardActions>
                        </Card>
                    </Fade>
                </Modal>
            </div>
            <AppBar position="fixed" sx={{bgcolor: '#fff'}}>
                <Container maxWidth={{xs: 'sm', md: 'lg'}}>
                    <Toolbar disableGutters>
                        <img src={logo} alt="logo" width="40px" height="40px" className={TopNavCSS.logo}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'black',
                            textDecoration: 'none',
                            }}
                        >
                            HRD-Online
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
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
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page, index) => (
                                page.hasSubPages ? (
                                    // <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <MenuItem key={index}>
                                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition sx={{zIndex: 9999}}>
                                            {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    {page.subPages.map((subPage, subIndex) => (
                                                            <React.Fragment key={subIndex}>
                                                                <Button href={subPage.link} target={subPage.target} sx={{textTransform: 'none', color: 'black'}}>{subPage.subName}</Button><br />
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </Paper>
                                            </Fade>
                                            )}
                                        </Popper>
                                        <Button
                                            target={page.target}
                                            href={page.link}
                                            key={index}
                                            onClick={handleClick('right-start')}
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                                        >
                                            {page.name}
                                        </Button>
                                        </MenuItem>
                                ) : (
                                    // <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <MenuItem key={index}>
                                        <Button
                                            target={page.target}
                                            href={page.link}
                                            key={index}
                                            onClick={handleCloseUserMenu}
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                                        >
                                            {page.name}
                                        </Button>
                                        </MenuItem>
                                )
                                // <MenuItem key={index} onClick={handleCloseNavMenu}>
                                //     <Typography textAlign="center" sx={{color: 'black'}}>{page.name}</Typography>
                                // </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                        <img src={logo} alt="logo" width="40px" height="40px" className={TopNavCSS.logo2}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            HRD-Online
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', mr: 2 }}>
                            {pages.map((page, index) => (
                                page.hasSubPages ? (
                                    <React.Fragment key={index}>
                                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition sx={{zIndex: 9999}}>
                                            {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    {subPages.map((subPage, subIndex) => (
                                                            <React.Fragment key={subIndex}>
                                                                <Button href={subPage.link} target={subPage.target} sx={{textTransform: 'none', color: 'black', width: '100%'}} fullWidth>{subPage.subName}</Button><br />
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </Paper>
                                            </Fade>
                                            )}
                                        </Popper>
                                        <Button
                                            target={page.target}
                                            href={page.link}
                                            key={index}
                                            onClick={handleClick('bottom-start')}
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                                        >
                                            {page.name}
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={index}>
                                        <Button
                                            target={page.target}
                                            href={page.link}
                                            key={index}
                                            onClick={handleCloseUserMenu}
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                                        >
                                            {page.name}
                                        </Button>
                                    </React.Fragment>
                                )
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button onClick={handleOpen}>Login</Button>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default TopNav