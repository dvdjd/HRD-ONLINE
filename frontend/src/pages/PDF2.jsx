import React, { useEffect, useState } from 'react'
import style from '../style/style.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SamplePDF from '../style/images/pdf-succinctly.pdf'
import { isAdmin } from '../utils/global';
import notFound from '../style/images/notFound.jpg'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import { getUploadItems } from '../services/LandingPageAPI'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { hrUpload, getHrUpload} from '../services/LandingPageAPI';

import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const PDF2 = () => {
    const isMobile = useMediaQuery("(max-width: 600px")
    const newplugin = defaultLayoutPlugin()
    const fullScreenPluginInstance = fullScreenPlugin()
    const { EnterFullScreen } = fullScreenPluginInstance;
    const zoomPluginInstance = zoomPlugin()
    const { Zoom } = zoomPluginInstance
    const [pdf, setPdf] = useState('')
    const [pdfKey, setPdfKey] = useState(0)
    const {cat} = useParams()
    const [newCat, setNewCat] = useState('')

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

    const [inputPDF, setInputPDF] = useState()
    const [sendFile, setSendFile] = useState()
    const [hasSelected, setHasSelected] = useState(false)
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
        setHasSelected(false)
        setOpenLogin(false)
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newDate = Date.now()
        setPdf({
            uploadDateTime: newDate,
            uploadDisplayName: newCat,
            uploadName: `${newDate}.pdf`,
            uploadType: cat
        })
        let formData = new FormData()
        // formData.append('type', uploadType.replace(/'/g, "\\'"))
        formData.append('type', cat)
        formData.append('file_name', newDate)
        formData.append('file', sendFile)
        formData.append('display_name', newCat)
        console.log(formData)
        const upload = await hrUpload(formData)
        handleClose()
        window.location.reload()
    }

    useEffect(() => {
        const getPDF = async () => {
            const gPdf = await getHrUpload({type: cat.replace(/'/g, "\\'")})
            setPdf(gPdf.data[0].uploadName)
            //setPdf(getHR.data[0].uploadName)
        }
        getPDF()
        if(cat === "missionVision"){
            setNewCat("Mission & Vision")
        }
        else if(cat === "companyProfile"){
            setNewCat("Company Profile")
        }
        else if(cat === "organizationChart"){
            setNewCat("Organization Chart")
        }
        else if(cat === "corporateValues"){
            setNewCat("Corporate Values")
        }
        else if(cat === "crr"){
            setNewCat("Company Rules and Regulations")
        }
        else if(cat === "qualityEnvironmental"){
            setNewCat("Quality and Environmental Policy")
        }
        else{
            setNewCat("")
        }
    }, [])
  return (
    <>
        <br /><br />
        <div className={style['flex-container']} style={{margin: '0 10px 10px 10px'}}>
            <div className={`${style["flex-item"]} ${style["small"]}`}>
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
                                            disabled
                                            value={newCat}
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
                <Box sx={{ minWidth: 275, mb: 2, height : "95%"}}>
                    <Card variant="outlined" sx={{borderRadius: '10px', mb: 2}}>
                        <CardContent >
                            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{pb: 1}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {newCat}
                                </Typography>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    {/* <IconButton aria-label="edit" size="large" sx={{color : "#42a5f5"}}>
                                        <EnterFullScreen />
                                    </IconButton> */}
                                    <EnterFullScreen />
                                    <Zoom />
                                    {isAdmin() === 1 ? (
                                        <IconButton aria-label="edit" size="large" sx={{color : "#42a5f5"}} onClick={handleOpen}>
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    ) : undefined}
                                </div>
                                
                            </Stack>
                            {pdf !== "" ? (
                                <div className="pdf-container" style={{height : "750px"}}>
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer key={pdfKey} fileUrl={`http://192.168.5.3:4000/hr_uploads/${pdf}`} plugins={[zoomPluginInstance, fullScreenPluginInstance]} />
                                    </Worker>
                                </div>
                            ) : (
                                <>
                                    <hr />
                                    <img src={notFound} alt="Not Found" width="40%" height="auto" style={{display: 'block', margin: "auto"}}/>
                                    <h2 style={{textAlign: "center", margin: 0}}>No file found</h2>
                                </>
                                
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </div>
    </>
  )
}

export default PDF2