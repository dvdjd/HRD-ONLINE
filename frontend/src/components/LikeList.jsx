import React from 'react'
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const LikeList = forwardRef(({likes}, ref) => {
    const style = {
        position: 'absolute',
        width: 500,
        height: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 1,
        marginTop: '50px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'}
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    useImperativeHandle(ref, () => ({handleOpen}))
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Card sx={style}>
                    <CardContent sx={{flex: 2, width: {xs: 300, md: '90%'},}}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                    <Tab label="All" value="1" />
                                    <Tab label="Item Two" value="2" />
                                    <Tab label="Item Three" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">Item One</TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </CardContent>
                </Card>
            </div>
        </Modal>
        </div>
    )
})

export default LikeList