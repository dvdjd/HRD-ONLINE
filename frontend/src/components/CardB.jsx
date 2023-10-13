import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import MessageIcon from '@mui/icons-material/Message';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Zoom } from '@mui/material';

import { Worker, Viewer} from '@react-pdf-viewer/core';
import { DefaultLayoutPlugin, defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
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

const CardB = () => {
  const [nav, setNav] = useState([
    {name: `President's Message`, icon: <MessageIcon />},
    {name: `People Concern`, icon: <DraftsIcon />},
    {name: `WW Calendars`, icon: <CalendarMonthIcon />},
    {name: `Health Alert`, icon: <MedicationLiquidIcon />},
  ])
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(true)
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [addIndex, setAddIndex] = useState(0)

  return (
    <>
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
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer fileUrl={samplePDF} plugins={[newplugin]} />
                    </Worker>
                  </div>
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
                <ListItemIcon onClick={() => alert(index)} onMouseEnter={() => {setShowAddIcon(true), setAddIndex(index)}} onMouseLeave={() => {setShowAddIcon(false)}}>
                  {showAddIcon === true && addIndex === index ? addIcon : nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} onClick={(event) => handleListItemClick(event, index)}/>
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
    
  )
}

export default CardB