import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Collapse } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaIcon from '@mui/icons-material/Spa';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions, userActions } from '../redux/actions';
import { capitalizeWords } from '../utils/global';

const DrawerComp = ({open = false, toggleDrawer}) => {
    const dispatch = useDispatch()
    const isMobile = useMediaQuery("(max-width:600px)")
    const navigate = useNavigate()

    const isLoggedIn = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [pages, setPages] = useState([
        {
            name: 'NMCP Company', hasSubPages: true, icon: <InfoIcon />, isOpen: false,
            subPages: [
                {subName: 'Company Profile', link: '/pdf2/companyProfile', target: '_self'},
                {subName: 'Corporate Values', link: '/pdf2/corporateValues', target: '_self'},
                {subName: 'Vision & Mission', link: '/pdf2/missionVision', target: '_self'},
                {subName: 'Company Rules and Regulations', link: '/pdf2/crr', target: '_self'},
                {subName: 'Quality and Environmental Policy', link: '/pdf2/qualityEnvironmental', target: '_self'},
            ]
        },
        {
            name: 'Recruitment / Training', hasSubPages: true, icon: <GroupAddIcon />, isOpen: false,
            subPages: [
                {subName: "Recruitment", link: '/pdf/recruitment', target: '_self'},
                {subName: "Training", link: '/pdf/training', target: '_self'},
            ]
        },
        {
            name: 'Compensation / Benefits', hasSubPages: true, icon: <LoyaltyIcon />, isOpen: false,
            subPages: [
                {subName: 'Benefits', link: '/pdf/benefits', target: '_self'},
                {subName: 'Promotions', link: '/pdf/promotions', target: '_self'},
                {subName: 'Government Updates', link: '/pdf/government', target: '_self'},
            ]
        },
        {
            name: 'HRD', hasSubPages: true, icon: <GroupsIcon />, isOpen: false,
            subPages: [
                {subName: 'Activities', link: '/pdf3/companyEvents', target: '_self'},
                {subName: 'Programs', link: '/pdf3/motivationProgram', target: '_self'},
                {subName: 'Forms', link: '/pdf/forms', target: '_self'},
                {subName: 'Procedures Guidelines', link: '/pdf/proceduresGuidelines', target: '_self'},
            ]
        },
        {
            name: 'ESH', hasSubPages: true, icon: <SpaIcon />, isOpen: false,
            subPages: [
                {subName: 'Activities/Programs', link: '/pdf3/eshCompanyEvents', target: '_self'},
                {subName: 'Forms', link: '/pdf/eshForms', target: '_self'},
                {subName: 'Procedures Guidelines', link: '/pdf/eshProceduresGuidelines', target: '_self'},
            ]
        },
    ]);

    const closeDrawer = () => {
        
        toggleDrawer(false)
        const closeAll = pages.map((p) => {
            return {...p, isOpen: false}
        })
        setIsLoginOpen(false)
        setPages(closeAll)
    }

    const expand = (index, newVal) => {
        const updated = pages.map((p, i) => {
            return i === index ? {...p, isOpen: newVal} : p
        })

        setPages(updated)
    }

    const switchPage = (link, index) => {
        toggleDrawer(false)
        if(index > -1){
            const updated = pages.map((p, i) => {
                return i === index ? {...p, isOpen: false} : p
            })

            setPages(updated)
        }
        
        navigate(link)
    }

    const handleLogin = () => {        
        toggleDrawer(false)
        dispatch(loginActions.setOpen())
    }

    const capitalEachWord = (str) => {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')
    } 
    
    const [user, setUser] = useState(null)
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('user')
        const u = isLoggedIn != "undefined" ? JSON.parse(sessionStorage.getItem('user')) : false
        u && setUser(u)
    },[])
    return (
        <div>
            <Button onClick={() => toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={closeDrawer}>
                <Box sx={{ width: isMobile ? 250 : 350 }} role="presentation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => switchPage('/', -1)}>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List>
                        {
                            pages.map((page, index) => (
                                <React.Fragment key={index}>
                                    <ListItemButton onClick={() => expand(index, !page.isOpen)}>
                                        <ListItemIcon>
                                            {page.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={page.name} />
                                        
                                    </ListItemButton>
                                    <Collapse in={page.isOpen} timeout="auto" unmountOnExit>
                                        {
                                            page.subPages.map((p, i) => (
                                                <List component="div" key={i}>
                                                    <ListItemButton sx={{ pl: 9 }}>
                                                        <ListItemText primary={p.subName} onClick={() => switchPage(p.link, index)}/>
                                                    </ListItemButton>
                                                </List>
                                            ))
                                        }
                                        {index != pages.length - 1 && (<Divider />)}
                                    </Collapse>
                                </React.Fragment>
                            ))
                        }
                    </List>
                    
                    <Divider />
                    <List>
                        <ListItemButton onClick={user != null ? () => setIsLoginOpen(prev => !prev) : handleLogin}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={user != null ? user?.FirstName === 'HRD' ? 'HRD' : `${capitalEachWord(user?.FirstName + ' ' + user?.LastName)}` : "Login"} />
                        </ListItemButton>
                        <Collapse in={isLoginOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItemButton sx={{ pl: 9 }} onClick={() => (sessionStorage.setItem('isLogin', false), sessionStorage.removeItem('user'), window.location.reload())}>
                                    <ListItemText primary={"Logout"}/>
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
        </div>
    )
}

export default DrawerComp