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
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Grid from '@mui/material/Grid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import { isAdmin } from '../utils/global';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { hrUpload, updateItem, removeItem } from '../services/LandingPageAPI';
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
import { Typography } from '@mui/material';
  
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const CardD = ({categ, handleAddCateg, handleSelectFile}) => {
    const {cat} = useParams()
    const [dense, setDense] = useState(false)
    const [secondary, setSecondary] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [removeID, setRemoveID] = useState(0)
    

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
    const [editID, setEditID] = useState(0)
    const [mode, setMode] = useState()
    const [sendFile, setSendFile] = useState()
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
        setSendFile("")
        setInputPDF("")
        setMode("add")
    };
    const handleClose = () => {
        setCategory('')
        setHasSelected(false)
        setOpenLogin(false)
        setHasSelected(false)
    };

    useEffect( () => {
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newDate = Date.now()
        let formData = new FormData()
        if(category === "" || inputPDF === ""){
            alert("Kindly input display name and attched a pdf file.")
        }
        else{
            if(mode === "add"){
                handleAddCateg({
                    ID: categ.length > 0 ? categ[0].ID + 1 : 0,
                    uploadDateTime: newDate,
                    uploadDisplayName: category,
                    uploadName: `${newDate}.pdf`,
                    uploadType: cat
                })
                formData.append('type', cat)
                formData.append('file_name', newDate)
                formData.append('file', sendFile)
                formData.append('display_name', category)
                console.log(formData)
                const upload = await hrUpload(formData)
                setSelectedIndex(1)
                handleClose()
            }
            else if (mode === "edit"){
                formData.append('id', editID)
                formData.append('type', cat)
                formData.append('file_name', newDate)
                formData.append('file', sendFile)
                formData.append('display_name', category)
                console.log(formData)
                const update = await updateItem(formData)
                handleClose()
                window.location.reload()
            }
            else{

            }
        }
    }

    const removeHRUpload = async () => {
        const remove = await removeItem({id: removeID})
        window.location.reload()
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
                        {mode === "remove" ? (
                            <>
                                <Typography sx={{textAlign: 'center'}} variant='h6'>Are you sure you want to delete this file?</Typography>
                                <Box display={'flex'} justifyContent={'flex-end'} m={'20px 0 10px 0'}>
                                    <Button variant='outlined' sx={{ mr: '10px'}} color='error' onClick={removeHRUpload}>Confirm</Button>
                                    <Button variant='contained' onClick={() => setOpenLogin((prev) => !prev)}>Cancel</Button>
                                </Box>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} >
                                <CardContent>
                                    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", mb: 2 }}>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Enter Display Name ..."
                                            inputProps={{ 'aria-label': 'upload file' }}
                                            defaultValue={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <Button component="label" sx={{justifyContent: 'center'}}>
                                            <CloudUploadIcon />
                                            <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleSelectPDF}/>
                                        </Button>
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
                        )}
                        
                    </Card>
                </Fade>
            </Modal>
            <Box sx={{ minWidth: 275, mb: 2, height: "95%", overflowY: 'scroll'}}>
                <Card variant="outlined" sx={{borderRadius: '10px', mb: 2}}>
                    <CardContent sx={{paddingBottom: 0}}>
                        {isAdmin() === 1 ? (
                            <Button variant="outlined" endIcon={< AddCircleIcon/>} onClick={handleOpen} sx={{width: '100%'}}>Add</Button>
                        ) : undefined}
                        <Grid item xs={12} md={6}>
                            <Demo>
                                <List dense={dense}>
                                    {categ.length > 0 ? categ.map((c, index) => (
                                        <ListItem key={index}
                                            secondaryAction={ isAdmin() === 1 ? (
                                                <>
                                                    <Popper
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        placement='top'
                                                        transition
                                                        key={index}
                                                    >
                                                        {({TransitionProps}) => (
                                                            <Fade {...TransitionProps} timeout={100}>
                                                                <Paper elevation={0} sx={{background: 'transparent'}}>
                                                                    <IconButton edge="end" aria-label="delete" sx={{color: '#42a5f5'}}
                                                                        onClick={(event) => {
                                                                            handleSelectFile(c);
                                                                            setCategory(c.uploadDisplayName);
                                                                            setOpenLogin(true);
                                                                            setMode("edit");
                                                                            setEditID(c.ID)
                                                                            setInputPDF("")
                                                                            setHasSelected(false)
                                                                        }}
                                                                    >
                                                                        <ModeIcon />
                                                                    </IconButton>
                                                                    <IconButton edge="end" aria-label="delete" sx={{color: 'red'}}
                                                                        onClick={() => {
                                                                            setMode("remove")
                                                                            setOpenLogin(true)
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Paper>
                                                            </Fade>
                                                        )}
                                                    </Popper> 
                                                    <IconButton edge="end" aria-label="delete" sx={{color: selectedIndex === index ? '#42a5f5' : "#bdbdbd"}}
                                                        onClick={(event) => {
                                                            setAnchorEl(event.currentTarget)
                                                            setOpen((prev) => !prev);
                                                            handleListItemClick(event, index);
                                                            setRemoveID(c.ID)
                                                        }}
                                                    >
                                                        <MoreHorizOutlinedIcon />
                                                    </IconButton>
                                                </>
                                                ) : undefined}
                                        >
                                            <ListItemButton sx={{borderRadius: '10px'}} selected={selectedIndex === index} onClick={(event) => {handleListItemClick(event, index); handleSelectFile(c)}}>
                                                <ListItemAvatar>
                                                    <InsertDriveFileIcon sx={{color: selectedIndex === index ? '#42a5f5' : "#bdbdbd"}}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={c.uploadDisplayName}
                                                    secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </ListItemButton>
                                            
                                        </ListItem> 
                                    )) : undefined}
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