import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import CardCCSS from './CardCCSS.module.css';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import {AiFillLike, AiFillHeart} from 'react-icons/ai'
import {FaLaughSquint, FaSadTear} from 'react-icons/fa'
import {ImShocked2} from 'react-icons/im'
import { getReact } from '../services/LandingPageAPI';
import { capitalizeWords, getTime } from '../utils/global';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import moment from 'moment';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const LikeList = forwardRef(({postID}, ref) => {
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

    const [tabItems, setTabItems] = useState([])
    const [allReactions, setAllReactions] = useState([])
    useEffect(() => {
        const gReact = async () => {
            const gr = await getReact({post_id: postID})
            if(gr.length > 0){
                setAllReactions(gr)
                
            }
            setTabItems([
                {label: `All ${gr.length}`, value: '1'},
                {label: (<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                            <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#0454d9'}}>
                                <AiFillLike color='#fff' size={15} style={{margin: '0'}}/>
                            </Avatar>
                            <div>
                                <Typography variant="body2">
                                    {gr.filter(item => item.reactType == 'like').length}
                                </Typography>
                            </div>
                        </Stack>), value: '2'},
                {label: (<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                            <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: 'red'}}>
                                <AiFillHeart color='#fff' size={15} style={{margin: '0'}}/>
                            </Avatar>
                            <div>
                                <Typography variant="body2">
                                    {gr.filter(item => item.reactType == 'heart').length}
                                </Typography>
                            </div>
                        </Stack>), value: '3'},
                {label: (<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                            <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                <FaLaughSquint color='#fff' size={15} style={{margin: '0'}}/>
                            </Avatar>
                            <div>
                                <Typography variant="body2">
                                    {gr.filter(item => item.reactType == 'laugh').length}
                                </Typography>
                            </div>
                        </Stack>), value: '4'},
                {label: (<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                            <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                <FaSadTear color='#fff' size={15} style={{margin: '0'}}/>
                            </Avatar>
                            <div>
                                <Typography variant="body2">
                                    {gr.filter(item => item.reactType == 'sad').length}
                                </Typography>
                            </div>
                        </Stack>), value: '5'},
                {label: (<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                            <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                <ImShocked2 color='#fff' size={15} style={{margin: '0'}}/>
                            </Avatar>
                            <div>
                                <Typography variant="body2">
                                    {gr.filter(item => item.reactType == 'wow').length}
                                </Typography>
                            </div>
                        </Stack>), value: '6'}
            ])
        }
        gReact()
        
    },[])
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
                                <TabList onChange={handleChange} variant='scrollable' aria-label="lab API tabs example">
                                    {tabItems.map((item, index) => (
                                        <Tab key={index} label={item.label} value={item.value} />
                                    ))}
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{height: '300px', overflowY: 'scroll'}}>
                                {allReactions.map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        
                                            {react.reactType == 'heart' ? (
                                                <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: 'red'}}>
                                                    <AiFillHeart color='#fff' size={15} style={{margin: '0'}}/>
                                                </Avatar>
                                            ) : react.reactType == 'wow' ? (
                                                <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                                    <ImShocked2 color='#fff' size={15} style={{margin: '0'}}/>
                                                </Avatar>
                                            ) : react.reactType == 'like' ? (
                                                <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#0454d9'}}>
                                                    <AiFillLike color='#fff' size={15} style={{margin: '0'}}/>
                                                </Avatar>
                                            ) : react.reactType == 'sad' ? (
                                                <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                                    <FaSadTear color='#fff' size={15} style={{margin: '0'}}/>
                                                </Avatar>
                                            ) : react.reactType == 'laugh' ? (
                                                <Avatar size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#ffbf00'}}>
                                                    <FaLaughSquint color='#fff' size={15} style={{margin: '0'}}/> 
                                                </Avatar>
                                            ) : undefined}
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="2">
                                {allReactions.filter(item => item.reactType == "like").map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#0454d9'}}>
                                            <AiFillLike color='#fff' size={15} style={{margin: '0'}}/>
                                        </Avatar>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="3">
                                {allReactions.filter(item => item.reactType == "heart").map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: 'red'}}>
                                            <AiFillHeart color='#fff' size={15} style={{margin: '0'}}/>
                                        </Avatar>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="4">
                                {allReactions.filter(item => item.reactType == "laugh").map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Avatar size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#ffbf00'}}>
                                            <FaLaughSquint color='#fff' size={15} style={{margin: '0'}}/> 
                                        </Avatar>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="5">
                                {allReactions.filter(item => item.reactType == "sad").map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                            <FaSadTear color='#fff' size={15} style={{margin: '0'}}/>
                                        </Avatar>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="6">
                                {allReactions.filter(item => item.reactType == "wow").map((react, index) => (
                                    <div className={CardCCSS['likesComments']} key={index} style={{alignItems: 'flex-start'}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} src={`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`} />
                                            <div key={index}>
                                                <div>
                                                    <Typography variant="body2">
                                                        {`${capitalizeWords(react.FirstName)} ${capitalizeWords(react.LastName)}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 0, fontSize: '12px'}} color="text.secondary">
                                                        {/* {getTime(react.reactDateTime)} */}
                                                        {react.Department}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Avatar alt={'Jhobert Erato'} src={'Jhobert Erato'} sx={{height: 24, width: 24, bgcolor: '#ffbf00'}}>
                                            <ImShocked2 color='#fff' size={15} style={{margin: '0'}}/>
                                        </Avatar>
                                    </div>
                                ))}
                            </TabPanel>
                        </TabContext>
                    </CardContent>
                </Card>
            </div>
        </Modal>
        </div>
    )
})

export default LikeList