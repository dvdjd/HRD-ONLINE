import React, { useEffect, useState } from 'react'
import { Box, Drawer, IconButton, Typography, Stack, Divider, Tabs, Tab, Avatar } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {AiFillLike, AiFillHeart} from 'react-icons/ai'
import {FaLaughSquint, FaSadTear} from 'react-icons/fa'
import {ImShocked2} from 'react-icons/im'
import { getReact } from '../services/LandingPageAPI';
import { capitalizeWords } from '../utils/global';
import CardCCSS from './CardCCSS.module.css';

const DrawerBottomComp = ({open, handleClose, handleOpen, postID}) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [allReactions, setAllReactions] = useState([])
    const [tabItems, setTabItems] = useState([])

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
        <>
            <Drawer open={open} onClose={() => handleClose()} anchor='top'>
                <Box sx={{ width: '100vw', height: '100vh', overflowY: 'auto' }} role="presentation">
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={3}
                        m={'10px 0px'}
                    >
                        <IconButton onClick={() => handleClose()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography>People who reacted</Typography>
                    </Stack>
                    <Divider/>
                    
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
                </Box>
            </Drawer>
        </>
    )
}

export default DrawerBottomComp