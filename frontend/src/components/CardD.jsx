import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';import WYSIWYG from './WYSIWYG';
import { hrUpload } from '../services/LandingPageAPI';
import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
  
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const CardD = ({categ, handleAddCateg, handleSelectFile}) => {
    const {cat} = useParams()
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: 200, md: 600},
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 1,
    };
    const [openLogin, setOpenLogin] = useState(false);
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const newplugin = defaultLayoutPlugin()
    const [inputPDF, setInputPDF] = useState()
    const [category, setCategory] = useState('')
    const [sendFile, setSendFile] = useState()
    const [uploadType, setUploadType] = useState('')
    const [hasSelected, setHasSelected] = useState(false)
    const [pdfKey, setPdfKey] = useState(0)
    const handleSelectPDF = (e) => {
        const file = e.target.files[0]
        setSendFile(file)
        setInputPDF(URL.createObjectURL(file))
        setTimeout(() => {
            setHasSelected(true)
            setPdfKey((prev) => prev + 1)
        }, 2000)
    }
   
    const handleOpen = () => {
        setOpenLogin(true)
    };
    const handleClose = () => {
        setCategory('')
        setHasSelected(false)
        setOpenLogin(false)
    };

    useEffect( () => {
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        handleAddCateg({
            ID: categ.length > 0 ? categ[0].ID + 1 : 0,
            uploadDateTime: Date.now(),
            uploadDisplayName: category,
            uploadName: `${sendFile.lastModified}.pdf`,
            uploadType: cat
        })
        let formData = new FormData()
        // formData.append('type', uploadType.replace(/'/g, "\\'"))
        formData.append('type', "Benefits")
        formData.append('file', sendFile)
        formData.append('display_name', category)
        const upload = await hrUpload(formData)
        handleClose()
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openLogin}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openLogin}>
                    <Card sx={style} >
                        <Stack direction="row-reverse" spacing={1}>
                            <IconButton aria-label="delete" size="medium" onClick={handleClose}>
                                <CancelIcon fontSize="inherit" sx={{color: 'red'}} />
                            </IconButton>
                        </Stack>
                        
                        <form onSubmit={handleSubmit} >
                            <CardContent>
                                {/* <Box sx={{ mb: 2, }}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField id="outlined-multiline-flexible" onChange={(e) => setCategory(e.target.value)} label="Category" sx={{width: '100%'}} />
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{width: '100%'}}>
                                            Upload
                                            <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleSelectPDF}/>
                                        </Button>
                                    </Stack>
                                </Box> */}
                                <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", mb: 2 }}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Enter Display Name ..."
                                        inputProps={{ 'aria-label': 'upload file' }}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <Button component="label" sx={{justifyContent: 'center'}}>
                                        <CloudUploadIcon />
                                        <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleSelectPDF}/>
                                    </Button>
                                    {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                        <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleSelectPDF}/>
                                        <CloudUploadIcon />
                                    </IconButton> */}
                                </Paper>
                                {hasSelected ? (
                                    <>
                                        <div className="pdf-container" style={{width: '100%', height: '400px'}}>
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                <Viewer key={pdfKey} fileUrl={inputPDF} plugins={[newplugin]} />
                                            </Worker>
                                        </div>
                                    </>
                                ) : undefined}
                                <Button size="medium" sx={{width: '100%', background : '#1976d2', mt: 2}} variant="contained" disableElevation type="submit">Submit</Button>
                            </CardContent>
                        </form>
                    </Card>
                </Fade>
            </Modal>
            <Box sx={{ minWidth: 275, mb: 2, height: "80%", overflowY: 'scroll'}}>
                <Card variant="outlined" sx={{borderRadius: '10px', mb: 2}}>
                    <CardContent sx={{paddingBottom: 0}}>
                        <Button variant="outlined" endIcon={< AddCircleIcon/>} onClick={handleOpen} sx={{width: '100%'}}>Add</Button>
                        <Grid item xs={12} md={6}>
                            <Demo>
                                <List dense={dense}>
                                    {categ.length > 0 ? categ.map((c, index) => (
                                        // <ListItem key={index}
                                        //     secondaryAction={
                                        //         <IconButton edge="end" aria-label="delete" sx={{color: '#42a5f5'}}>
                                        //             <ModeIcon />
                                        //         </IconButton>
                                        //     }
                                        // >
                                        //     <ListItemButton sx={{borderRadius: '10px'}} selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                                        //         <ListItemText primary="Trash" />
                                        //     </ListItemButton>
                                        // </ListItem>
                                        
                                        <ListItem key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" sx={{color: selectedIndex === index ? '#42a5f5' : "#bdbdbd"}}>
                                                    <ModeIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemButton sx={{borderRadius: '10px'}} selected={selectedIndex === index} onClick={(event) => {handleListItemClick(event, index); handleSelectFile(c)}}>
                                                <ListItemAvatar>
                                                    <FolderIcon sx={{color: selectedIndex === index ? '#42a5f5' : "#bdbdbd"}}/>
                                                    
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={c.uploadDisplayName}
                                                    secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </ListItemButton>
                                            
                                        </ListItem>
                                        )
                                    ) : undefined}
                                </List>
                            </Demo>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardD