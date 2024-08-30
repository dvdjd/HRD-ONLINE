import React, { useState, useRef, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from '@mui/material';
import logo from '../style/images/nmcp-logo.png'
import logo2 from '../style/images/logo.png'
import TopNavCSS from './TopNav.module.css'
import NavigationCSS from './Navigation.module.css'
import {HiUser} from 'react-icons/hi'
import { getUploadItems } from '../services/LandingPageAPI';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Login from './Login';
import Drawer from './Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../redux/actions';

import { capitalizeWords } from '../utils/global';

const TopNav = () => {
    const dispatch = useDispatch()
    const isMobile = useMediaQuery("(max-width: 600px)")
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = (val) => {
        setOpenDrawer(val)
    }

    const pages = [
        {
            name: 'NMCP Company', hasSubPages: true,
            subPages: [
                {subName: 'Company Profile', link: '/pdf2/companyProfile', target: '_self'},
                {subName: 'Corporate Values', link: '/pdf2/corporateValues', target: '_self'},
                {subName: 'Vision & Mission', link: '/pdf2/missionVision', target: '_self'},
                {subName: 'Company Rules and Regulations', link: '/pdf2/crr', target: '_self'},
                {subName: 'Quality and Environmental Policy', link: '/pdf2/qualityEnvironmental', target: '_self'},
            ]
        },
        {
            name: 'Recruitment / Training', hasSubPages: true,
            subPages: [
                {subName: "Recruitment", link: '/pdf/recruitment', target: '_self'},
                {subName: "Training", link: '/pdf/training', target: '_self'},
            ]
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
            name: 'HRD', hasSubPages: true,
            subPages: [
                {subName: 'Activities', link: '/pdf3/companyEvents', target: '_self'},
                {subName: 'Programs', link: '/pdf3/motivationProgram', target: '_self'},
                {subName: 'Forms', link: '/pdf/forms', target: '_self'},
                {subName: 'Procedures Guidelines', link: '/pdf/proceduresGuidelines', target: '_self'},
            ]
        },
        // {
        //     name: 'ESH', link: '/pdf/esh', target: '_self', hasSubPages: false
        // },
        {
            name: 'ESH', hasSubPages: true,
            subPages: [
                {subName: 'Activities/Programs', link: '/pdf3/eshCompanyEvents', target: '_self'},
                {subName: 'Forms', link: '/pdf/eshForms', target: '_self'},
                {subName: 'Procedures Guidelines', link: '/pdf/eshProceduresGuidelines', target: '_self'},
            ]
        },
        // {
        //     name: 'Activities / Programs', hasSubPages: true,
        //     subPages: [
        //         {subName: "Company Events", link: '/pdf3/companyEvents', target: '_self'},
        //         {subName: "Motivational Program", link: '/pdf3/motivationProgram', target: '_self'},
        //     ]
        // },
        // {
        //     name: 'Galleries', link: '/galleries', target: '_self', hasSubPages: false
        // },
    ];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    /*-----------------SubPages Modal----------------------*/
    const [anchorEl, setAnchorEl] = useState(null);
    const [activePage, setActivePage] = useState(-1)
    //const [open, setOpen] = React.useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOpen = (e, index) => {
        setAnchorEl(e.currentTarget)
        setActivePage(index)
    }
    /*-----------------Login------------------------------*/
    // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [user, setUser] = useState(null)
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('user')
        const u = isLoggedIn != "undefined" ? JSON.parse(sessionStorage.getItem('user')) : false
        
        u && setUser(u)
    }, [])

    return (
        <>
            <div>
                <Login />
            </div>
            <AppBar position="fixed" sx={{bgcolor: '#fff'}} elevation={1}>
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
                            HRD-ESH Online
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => toggleDrawer(true)}
                                color="black"
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <Menu
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
                            </Menu> */}
                        </Box>
                        <img src={logo} alt="logo" width="25px" height="25px" className={TopNavCSS.logo2}/>
                        <Typography
                            variant="body2"
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
                            HRD-ESH -Online
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', mr: 2 }}>
                            {pages.map((page, index) => (
                                page.hasSubPages ? (
                                    <React.Fragment key={index}>
                                        <Button target={page.target} href={page.link} key={index}
                                            onClick={(e) => handleOpen(e, index)}
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
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(false)}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                elevation={1}
                            >
                                {activePage > -1 && pages[activePage].subPages.map((subPage, subIndex) => (
                                        <React.Fragment key={subIndex}>
                                            <Button href={subPage.link} target={subPage.target} sx={{textTransform: 'none', color: 'black', width: '100%', justifyContent: 'flex-start'}} fullWidth>{subPage.subName}</Button><br />
                                        </React.Fragment>
                                    )
                                )}
                            </Popover>
                        </Box>
                        {
                            !isMobile && (
                                <Box sx={{ flexGrow: 0 }}>
                                    {sessionStorage.getItem('isLogin') === 'true' ? (
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user != null ? capitalizeWords(user?.FirstName) : ''} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    ) : (
                                        <ul className={NavigationCSS['navbar-items']} onClick={() => dispatch(loginActions.setOpen())}>
                                            <li className={NavigationCSS['login']}>
                                                <a className={`${NavigationCSS['d-flex']} ${NavigationCSS['align-center']}`}>
                                                    <div style={{
                                                        padding: '5px 7px',
                                                        borderRadius: '60px',
                                                        background: '#ffff',
                                                        margin: '0 10px 0 0'
                                                    }}>  
                                                        <HiUser color='#0454d9' size={20} className={NavigationCSS['mr-10']} style={{margin: '0'}}/>
                                                    </div>
                                                    Login
                                                </a>
                                            </li>
                                        </ul>
                                    )}
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
                                        {sessionStorage.getItem('isLogin') === 'false' ? (
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Button onClick={() => dispatch(loginActions.setOpen())}>Login</Button>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Button onClick={() => (sessionStorage.setItem('isLogin', false), sessionStorage.removeItem('user'), window.location.reload())} sx={{color: 'red'}}>Logout</Button>
                                            </MenuItem>
                                        )}
                                    </Menu>
                                </Box>
                            )
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer open={openDrawer} toggleDrawer={toggleDrawer} />
        </>
    )
}

export default TopNav