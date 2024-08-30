import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import DraftsIcon from '@mui/icons-material/Drafts';
import MessageIcon from '@mui/icons-material/Message';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Typography';
import { getHrUpload } from '../services/LandingPageAPI';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Zoom } from '@mui/material';
import UploadPDF from './uploadPDF';
import { isAdmin } from '../utils/global';

import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin, RenderEnterFullScreenProps  } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import samplePDF from '../style/images/pdf-succinctly.pdf'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import React, { useEffect, useRef, useState } from 'react';

const style = {
  position: 'absolute',
  width: {xs: 320, md: '90%'},
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  marginTop: '50px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto !important'
};
const style2 = {
  position: 'absolute',
  width: 320,
  height: '100px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  top: '40%',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: {xs: 'column', md: 'row'},
};

const CardB = () => {
  const [nav, setNav] = useState([
    {name: `President's Message`, icon: <MessageIcon />},
    {name: `People Concern`, icon: <DraftsIcon />},
    {name: `WW Calendars`, icon: <CalendarMonthIcon />},
    // {name: `Health Alert`, icon: <MedicationLiquidIcon />},
  ])

  const [user, setUser] = useState(null)

  const [system, setSystem] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [file, setFile] = useState('')
  const [pdfKey, setPdfKey] = useState(0)
  const [userType, setUserType] = useState("")

  const handleListItemClick = async (event, index, type) => {
    setSelectedIndex(index);
    setOpen(true)

    const getHR = await getHrUpload({type: type.replace(/'/g, "\\'")})
    setFile(getHR.data[0].uploadName)
    setTimeout(() => {
      setPdfKey((prev) => prev + 1)
    }, 2000)
  };

  const selectedIndexRef = useRef(selectedIndex)

  const [wwOpen, setWWOpen] = useState(false)
  const handleSetWWOpen = () => {
    setWWOpen(!wwOpen)
  }
  useEffect(() => {
    selectedIndexRef.current = selectedIndex
    const isLoggedIn = sessionStorage.getItem('user')
    
    const u = isLoggedIn != "undefined" ? JSON.parse(sessionStorage.getItem('user')) : false

    u && setUserType(u.UserType)
    
    setSystem([
      {
        name: 'Performance Appraisal', 
        link: u ? u.UserType === "Immediate Superiors" ? `http://192.168.4.2:8080/hrd-online/PA/pa_entry-1.php?_PA=2&idno=${u.ID_No}&usertype=${u.UserType}` 
                  : u.UserType === "Department Heads" ? `http://192.168.4.2:8080/hrd-online/PA/pa_entry-2.php?_PA=2&idno=${u.ID_No}&usertype=${u.UserType}`
                  : u.UserType === "Division Heads" ? `http://192.168.4.2:8080/hrd-online/PA/pa_entry-3.php?_PA=2&idno=${u.ID_No}&usertype=${u.UserType}`
                  : "http://192.168.4.2:8080/hrd-online/pa/"
                : "http://192.168.4.2:8080/hrd-online/pa/", 
        stat: 1
      },
      {
        name: 'PTR-Online', 
        link: !u ? `http://192.168.4.2/PTR-Online/Login.aspx` : `http://192.168.4.2/PTR-Online/Menu.aspx?EmpID=${u.ID_No}`, 
        stat: 2
      },
      //{name: 'Competency Profile', link: sessionStorage.getItem('isLogin') === 'true' ? `http://192.168.4.2/hris/main.aspx?idno=${JSON.parse(sessionStorage.getItem('user')).ID_No}` : "http://192.168.4.2/hris/login.aspx", stat: 1},
      {
        name: 'Competency Profile', 
        link: !u ? "http://192.168.4.2/hris/login.aspx" : `http://192.168.4.2/hris/main.aspx?idno=${u.ID_No}`, 
        stat: 1
      },
      {
        name: 'EDS Web Portal', 
        link: "http://192.168.4.9:90/Login.aspx", 
        stat: 1
      },
    ])
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev === nav.length - 1 ? 0 : prev + 1))
    }, 5000);
    return () => clearInterval(timer)
  }, [])

  const [addIcon, setAddIcon] = useState((<AddCircleIcon sx={{color: '#0275d8'}} />))
  const [showAddIcon, setShowAddIcon] = useState(false)
  const [showAddIcon2, setShowAddIcon2] = useState(false)
  const [showAddIcon3, setShowAddIcon3] = useState(false)
  /*-----------PDF Viewer--------------*/
  const newplugin = defaultLayoutPlugin()
  const fullScreenPluginInstance = fullScreenPlugin()
  const { EnterFullScreen } = fullScreenPluginInstance;
  const zoomPluginInstance = zoomPlugin()
  const { Zoom } = zoomPluginInstance
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleClose2 = () => {setOpen2(false)};
  const handleClose3 = () => {setOpen3(false)};
  const [addIndex, setAddIndex] = useState(0)
  const upload = useRef()

  const [open3, setOpen3] = useState(false)
  const [iFrameLink, setIFrameLink] = useState("")
  const handleOpenIFrame = (link) => {
    setOpen3(true)
    setIFrameLink(link)
  }

  return (
    <>
      <UploadPDF ref={upload} />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{display:'flex', justifyContent: 'center'}}>
            <Card sx={style}>
              <CardContent sx={{ width: {xs: 300, md: '95%'}, m:'auto'}}>
                <Stack direction="row-reverse" spacing={1} justifyContent={'flex-end'} sx={{float: 'right!important'}}>
                  <IconButton aria-label="delete" size="medium" onClick={handleClose}>
                      <CancelIcon fontSize="inherit" sx={{color: 'red'}} />
                  </IconButton>
                </Stack>
                <Box sx={{ mt: 1, padding: 1.5, borderRadius: 1}}>
                  <div className="pdf-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <EnterFullScreen />
                        <Zoom />
                    </div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer key={pdfKey} fileUrl={`http://192.168.5.3:4000/hr_uploads/${file}`} plugins={[zoomPluginInstance, fullScreenPluginInstance]} />
                    </Worker>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </div> 
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{display:'flex', justifyContent: 'center'}}>
            <Card sx={style2}>
              <CardContent sx={{flex: 2, width: 50, pt: 0, pb: 0, textAlign: 'center'}}>
                <Typography variant="subtitle1" gutterBottom sx={{color: '#808080', textAlign: 'center'}}>
                  Kindly login first
                </Typography>
                <IconButton aria-label="delete" sx={{color: 'red'}} size='large'>
                  <NoAccountsIcon sx={{width: 50, height: 50}}/>
                </IconButton>
              </CardContent>
            </Card>
          </div> 
        </Modal>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{display:'flex', justifyContent: 'center'}}>
            <Card sx={style}>
              <CardContent sx={{ width: {xs: 300, md: '95%'}}}>
                <Stack direction="row-reverse" spacing={1} justifyContent={'flex-end'} sx={{float: 'right!important'}}>
                  <IconButton aria-label="delete" size="medium" onClick={handleClose3}>
                      <CancelIcon fontSize="inherit" sx={{color: 'red'}} />
                  </IconButton>
                </Stack>
                <Box sx={{ borderRadius: 1, display: 'flex', justifyContent: 'center'}}>
                  <iframe
                    src={iFrameLink}
                    title="W3Schools Free Online Web Tutorials"
                    style={{
                      height: "80vh",
                      width: "100%"
                    }}
                    ></iframe>
                </Box>
              </CardContent>
            </Card>
          </div> 
        </Modal>
      </div>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <List component="nav" aria-label="main mailbox folders" sx={{display: 'flex', flexDirection: 'column', borderRadius: '10px', mb: 2, p: 2}}>
          {nav.map((nav, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                selected={selectedIndex === index}
                sx={{width: '100%'}}
              >
                <ListItemIcon onMouseEnter={() => {nav.name === "President's Message" ? isAdmin() === 1 ? (setShowAddIcon(true), setAddIndex(index)) : undefined : undefined}} onMouseLeave={() => {setShowAddIcon(false)}} onClick={isAdmin() === 1 ? () => upload.current?.handleOpen(nav.name) : undefined}>
                  {showAddIcon === true && addIndex === index && sessionStorage.getItem('isLogin') === 'true' ? addIcon : nav.icon}
                </ListItemIcon>
                {nav.name === "WW Calendars" ? (
                  <>
                    <ListItemText primary={nav.name} onClick={handleSetWWOpen}/>
                    {wwOpen ? <ExpandLess /> : <ExpandMore />}
                  </>
                ) : (
                  <ListItemText primary={nav.name} onClick={nav.name === "People Concern" ? sessionStorage.getItem('isLogin') === 'true' ? () => upload.current?.handleOpen(nav.name) : () => setOpen2(true) : (event) => handleListItemClick(event, index, nav.name)}/>
                )}
              </ListItemButton>
            </React.Fragment>
          ))}
          <Collapse in={wwOpen} timeout="auto" unmountOnExit sx={{width: '100%'}}>
            <List component="div" disablePadding>
              <ListItemButton sx={{pl: 6}}>
                <ListItemIcon onMouseEnter={() => {isAdmin() === 1 ? setShowAddIcon2(true) : undefined}} onMouseLeave={() => {setShowAddIcon2(false)}} onClick={isAdmin() === 1 ? () => upload.current?.handleOpen("WW Calendars - Operations") : undefined}>
                  {showAddIcon2 === true && sessionStorage.getItem('isLogin') === 'true' ? addIcon : (<StarBorder />)}
                </ListItemIcon>
                <ListItemText primary="Operations" onClick={(event) => handleListItemClick(event, 2, "WW Calendars - Operations")}/>
              </ListItemButton>
              <ListItemButton sx={{pl: 6}}>
                <ListItemIcon onMouseEnter={() => {isAdmin() === 1 ? setShowAddIcon3(true) : undefined}} onMouseLeave={() => {setShowAddIcon3(false)}} onClick={isAdmin() === 1 ? () => upload.current?.handleOpen("WW Calendars - Support") : undefined}>
                  {showAddIcon3 === true && sessionStorage.getItem('isLogin') === 'true' ? addIcon : (<StarBorder />)}
                </ListItemIcon>
                <ListItemText primary="Support" onClick={(event) => handleListItemClick(event, 2, "WW Calendars - Support")}/>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <List component="nav" aria-label="main mailbox folders" sx={{display: 'flex', flexDirection: 'column', borderRadius: '10px', mb: 2, p: 2}}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              HRD Links
            </ListSubheader>
          }
        >
          {system.map((nav, index) => (
            <React.Fragment key={index}>
              {nav.stat === 1 || sessionStorage.getItem('isLogin') === 'true' || nav.name === "PTR-Online" ? 
                nav.name === "Performance Appraisal" || nav.name === "PTR-Online" || nav.name === "Competency Profile" ? 
                  (
                  
                    <ListItemButton
                      sx={{width: '100%'}}
                      // href={nav.link} target="_blank"
                      onClick={() => handleOpenIFrame(nav.link)}
                      disabled={nav.name === "Performance Appraisal" || nav.name === "Competency Profile" || nav.name === "PTR-Online" ? sessionStorage.getItem('isLogin') == 'false' ? true : userType === null ? true : false : false}
                    >
                      <ListItemText primary={nav.name}/>
                    </ListItemButton>
                  ) 
                : 
                  (
                    
                    <ListItemButton
                      sx={{width: '100%'}}
                      href={nav.link} target="_blank"
                      disabled={nav.name === "Performance Appraisal" || nav.name === "Competency Profile" ? sessionStorage.getItem('isLogin') == 'false' ? true : userType === null ? true : false : false}
                    >
                      <ListItemText primary={nav.name}/>
                    </ListItemButton>
                  ) 
              :
                (
                    <ListItemButton
                      sx={{width: '100%'}}
                      onClick={() => setOpen2(true)}
                      disabled={nav.name === "Performance Appraisal" || nav.name === "Competency Profile" ? true : false}
                    >
                      <ListItemText primary={nav.name}/>
                    </ListItemButton>
                )
              }
              
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
    
  )
}

export default CardB