import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import WYSIWYG from './WYSIWYG';
import { hrUpload, sendMail } from '../services/LandingPageAPI';
import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Wysiwyg } from '@mui/icons-material';
import { TextField } from '@mui/material';

const UploadPDF = forwardRef(({}, ref) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: 200, md: 800},
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
    const newplugin = defaultLayoutPlugin()
    const [inputPDF, setInputPDF] = useState()
    const [sendFile, setSendFile] = useState()
    const [uploadType, setUploadType] = useState('')
    const [hasSelected, setHasSelected] = useState(false)
    const [pdfKey, setPdfKey] = useState(0)
    const [concern, setConcern] = useState('')
    const handleSelectPDF = (e) => {
        const file = e.target.files[0]
        setSendFile(file)
        setInputPDF(URL.createObjectURL(file))
        setTimeout(() => {
            setHasSelected(true)
            setPdfKey((prev) => prev + 1)
        }, 2000)
        // if(file.length > 0){
        //     const validFile = Array.from(file).filter((f) => {
        //         return f.type.startsWith('application/pdf')
        //     })
        //     if(validFile.length > 0){
        //         setInputPDF(validFile)
        //         setHasSelected(true)

        //     }
        //     else{
        //         setInputPDF()
        //         setHasSelected(false)
        //         alert('pdf lang dapat')
        //     }
        // }
    }
    const handleOpen = (type) => {
        setOpenLogin(true)
        setUploadType(type)
        {type === "People Concern" ? (
            setFormIcon(
                <>
                    <TextField id="concern" label="Tell us your concern..." variant="outlined" fullWidth onChange={(e) => setConcern(e.target.value)} multiline rows={10}/>
                </>
            )
        ) : (
            setFormIcon(
                <>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{width: '100%'}}>
                        Upload {type}
                        <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleSelectPDF}/>
                    </Button>
                </>
            )
        )}
    };
    const [formIcon, setFormIcon] = useState()
    const handleClose = () => {
        setUploadType('')
        setHasSelected(false)
        setOpenLogin(false)
    };

    useImperativeHandle(ref, () => ({handleOpen}))

    const userRef = useRef()
    const [pin, setPin] = useState('')

    useEffect( () => {
    
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (uploadType === 'People Concern') {
            const send = await sendMail({concern: concern})
            setConcern('')
        } else {
            let formData = new FormData()
            formData.append('type', uploadType.replace(/'/g, "\\'"))
            formData.append('file', sendFile)
            const upload = await hrUpload(formData)
        } 
        
        handleClose()
    }
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openLogin}
        //onClose={() => console.log("TEST")}
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
                        <Box sx={{ mb: 2, }}>
                            {formIcon}
                        </Box>
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
  )
})

export default UploadPDF