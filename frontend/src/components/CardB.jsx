import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
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

import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin, RenderEnterFullScreenProps  } from '@react-pdf-viewer/full-screen';

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import samplePDF from '../style/images/pdf-succinctly.pdf'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';

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
  flexDirection: {xs: 'column', md: 'row'},
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
  const [system, setSystem] = useState([
    {name: 'Performance Appraisal', link: "http://192.168.4.2:8080/hrd-online/pa/", stat: 1},
    {name: 'PTR-Online', link: JSON.parse(localStorage.getItem('user')) == null ? `http://192.168.4.2/PTR-Online/Login.aspx` : `http://192.168.4.2/PTR-Online/Menu.aspx?EmpID=${JSON.parse(localStorage.getItem('user')).ID_No}`, stat: 2},
    {name: 'HRIS', link: "http://192.168.4.2/hris/login.aspx", stat: 1},
    {name: 'Intranet Online Filing', link: "http://192.168.4.9:90/Login.aspx", stat: 1},
  ])
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [file, setFile] = useState('')
  const [pdfKey, setPdfKey] = useState(0)

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

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev === nav.length - 1 ? 0 : prev + 1))
    }, 5000);
    return () => clearInterval(timer)

  }, [])

  const [addIcon, setAddIcon] = useState((<Zoom in={true}><AddCircleIcon sx={{color: '#0275d8'}} /></Zoom>))
  const [showAddIcon, setShowAddIcon] = useState(false)
  /*-----------PDF Viewer--------------*/
  const newplugin = defaultLayoutPlugin()
  const fullScreenPluginInstance = fullScreenPlugin()
    const { EnterFullScreen } = fullScreenPluginInstance;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleClose2 = () => {setOpen2(false)};
  const [addIndex, setAddIndex] = useState(0)
  const upload = useRef()
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
          <div style={{display:'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Card sx={style}>
              <CardContent sx={{flex: 2, width: {xs: 300, md: '90%'},}}>
                <Box sx={{border: '1px solid #cccccc', mt: 1, padding: 1.5, borderRadius: 1}}>
                  <div className="pdf-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <EnterFullScreen />
                    </div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer key={pdfKey} fileUrl={`http://192.168.5.12:4000/hr_uploads/${file}`} plugins={[fullScreenPluginInstance]} />
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
      </div>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <List component="nav" aria-label="main mailbox folders" sx={{display: 'flex', flexDirection: 'column', borderRadius: '10px', mb: 2, p: 2}}>
          {nav.map((nav, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                selected={selectedIndex === index}
                sx={{width: '100%'}}
              >
                <ListItemIcon onMouseEnter={() => {nav.name !== "People Concern" ? (setShowAddIcon(true), setAddIndex(index)) : undefined}} onMouseLeave={() => {setShowAddIcon(false)}} onClick={() => upload.current?.handleOpen(nav.name)}>
                  {showAddIcon === true && addIndex === index && localStorage.getItem('isLogin') === 'true' ? addIcon : nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} onClick={nav.name === "People Concern" ? localStorage.getItem('isLogin') === 'true' ? () => upload.current?.handleOpen(nav.name) : () => setOpen2(true) : (event) => handleListItemClick(event, index, nav.name)}/>
              </ListItemButton>
            </React.Fragment>
          ))}
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
              {nav.stat === 1 || localStorage.getItem('isLogin') === 'true' || nav.name === "PTR-Online" ? (
                <ListItemButton
                  sx={{width: '100%'}}
                  href={nav.link} target="_blank"
                >
                  <ListItemText primary={nav.name}/>
                </ListItemButton>
              ) : (
                  <ListItemButton
                    sx={{width: '100%'}}
                    onClick={() => setOpen2(true)}
                  >
                    <ListItemText primary={nav.name}/>
                  </ListItemButton>
              )}
              
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
    
  )
}

export default CardB