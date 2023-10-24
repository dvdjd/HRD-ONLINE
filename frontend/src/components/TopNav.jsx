import React, { useState, useRef, useEffect } from 'react'
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
import logo2 from '../style/images/logo.png'
import TopNavCSS from './TopNav.module.css'
import NavigationCSS from './Navigation.module.css'
import {HiUser} from 'react-icons/hi'

import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Login from './Login';

import { capitalizeWords } from '../utils/global';

const TopNav = () => {
    const pages = [
        {
            name: 'NMCP Company', hasSubPages: true,
            subPages: [
                {subName: 'Company Profile', link: '/pdf2/companyProfile', target: '_self'},
                {subName: 'Organization Chart', link: '/pdf2/organizationChart', target: '_self'},
                {subName: 'Corporate Values', link: '/pdf2/corporateValues', target: '_self'},
                {subName: 'Vision & Mission', link: '/pdf2/missionVision', target: '_self'},
                {subName: 'Company Rules and Regulations', link: '/pdf2/crr', target: '_self'},
                {subName: 'Quality and Environmental Policy', link: '/pdf2/qualityEnvironmental', target: '_self'},
            ]
        },
        {
            name: 'Recruitment / Training', link: '/', target: '_self', hasSubPages: false, subPages: []
        },
        {
            name: 'Compensation / Benefits', hasSubPages: true,
            subPages: [
                {subName: 'Benefits', link: '/pdf/benefits', target: '_self'},
                {subName: 'Promotions', link: '/pdf/promotions', target: '_self'},
                {subName: 'Government Updates', link: '/pdf/government', target: '_self'},
            ]
        },
        {
            name: 'Procedure, Guidelines & Forms', link: '/', target: '_self', hasSubPages: false, subPages: []
        },
        {
            name: 'Environmental', link: '/', target: '_self', hasSubPages: false
        },
        {
            name: 'Activities / Programs', link: '/pdf3', target: '_self', hasSubPages: false
        },
        // {
        //     name: 'Galleries', link: '/galleries', target: '_self', hasSubPages: false
        // },
    ];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [subPages, setSubPages] = useState([])
    const handleSetSubPages = (index) => {
        setSubPages([])
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

    const handleClick = (newPlacement, index) => (event) => {
        handleSetSubPages(index)
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    /*-----------------Login------------------------------*/
    const login = useRef()
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])
    return (
        <>
            <div>
                <Login ref={login} />
            </div>
            <AppBar position="fixed" sx={{bgcolor: '#fff'}}>
                <Container maxWidth={{xs: 'sm', md: 'lg'}} sx={{paddingRight: '0px'}}>
                    <Toolbar disableGutters>
                        <img src={logo2} alt="logo" width="60px" height="60px" className={TopNavCSS.logo}/>
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
                                    <MenuItem key={index} onClick={handleClick('right-start', index)}>
                                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition sx={{zIndex: 9999}}>
                                            {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    {subPages.map((subPage, subIndex) => (
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
                                            sx={{ my: 2, color: 'blue', display: 'block', textTransform: 'none' }}
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
                                                                <Button href={subPage.link} target={subPage.target} sx={{textTransform: 'none', color: 'black', width: '100%', justifyContent: 'flex-start'}} fullWidth>{subPage.subName}</Button><br />
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </Paper>
                                            </Fade>
                                            )}
                                        </Popper>
                                        <Button target={page.target} href={page.link} key={index}
                                            onClick={handleClick('bottom-start', index)}
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none', fontSize: '12px' }}
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
                                            sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none', fontSize: '12px' }}
                                        >
                                            {page.name}
                                        </Button>
                                    </React.Fragment>
                                )
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="">
                                {localStorage.getItem('isLogin') === 'true' ? (
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={localStorage.getItem('user') !== null ? capitalizeWords(user.FirstName) : ''} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                ) : (
                                    <ul className={NavigationCSS['navbar-items']} onClick={() => login.current?.handleOpen()}>
                                        <li className={NavigationCSS['login']}><a className={`${NavigationCSS['d-flex']} ${NavigationCSS['align-center']}`}>
                                            <div className={NavigationCSS["icon"]}>  
                                                <HiUser color='#0454d9' size={20} className={NavigationCSS['mr-10']} style={{margin: '0'}}/>
                                            </div>
                                            Login
                                        </a></li>
                                    </ul>
                                )}
                            </Tooltip>
                            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            >
                                {localStorage.getItem('isLogin') === 'false' ? (
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Button onClick={() => login.current?.handleOpen()}>Login</Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Button onClick={() => (localStorage.setItem('isLogin', false), localStorage.removeItem('user'), window.location.reload())} sx={{color: 'red'}}>Logout</Button>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default TopNav