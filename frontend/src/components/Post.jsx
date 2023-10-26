import React, {useEffect, useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import styled from '@emotion/styled';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Me from '../style/images/me.png'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TextSnippetTwoTone } from '@mui/icons-material';
import { Document, Page } from 'react-pdf';
import { capitalizeWords } from '../utils/global';

import { newPost, getPost } from '../services/LandingPageAPI';
const Post = (onPost) => {
    /*--------------------------Post----------------------*/
    const style = {
        position: 'absolute',
        width: {xs: 320, md: 400},
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 1,
        overflowY: 'auto',
        marginTop: '50px'
    };
    const [post, setPost] = useState(false);
    const handleOpenPost = () => setPost(true);
    const handleClosePost = () => setPost(false);
    const PostImage = styled('input')({
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
    const PostVideo = styled('input')({
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
    const PostPdf = styled('input')({
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
    const [selectedImage, setSelectedImage] = useState([])
    const [selectedVideo, setSelectedVideo] = useState([])
    const [selectedFile, setSelectedFile] = useState([])
    const handleSelectedImage = (event) => {
        const files = event.target.files
        if(files.length > 0){
            const validFiles = Array.from(files).filter((file) => {
                return file.type.startsWith('image/')
            })
            if(validFiles.length > 0){
                setSelectedImage(validFiles)
            }
            else{
                setSelectedImage([])
                alert('image lang dapat')
            }
        }
    }
    const handleSelectedVideo = (event) => {
        const files = event.target.files
        if(files.length > 0){
            const validFiles = Array.from(files).filter((file) => {
                return file.type.startsWith('video/')
            })
            if(validFiles.length > 0){
                setSelectedVideo(validFiles)
            }
            else{
                setSelectedVideo([])
                alert('video lang dapat')
            }
        }
    }
    const handleSelectedFile = (event) => {
        const files = event.target.files
        if(files.length > 0){
            const validFiles = Array.from(files).filter((file) => {
                return file.type.startsWith('application/pdf')
            })
            if(validFiles.length > 0){
                setSelectedFile(validFiles)
            }
            else{
                setSelectedFile([])
                alert('pdf lang dapat')
            }
        }
    }

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [activeStepVid, setActiveStepVid] = useState(0);
    const [activeStepFile, setActiveStepFile] = useState(0);
    const maxSteps = selectedImage.length;
    const vidMaxSteps = selectedVideo.length;
    const fileMaxSteps = selectedFile.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleNextVid = () => {
        setActiveStepVid((prevActiveStep) => prevActiveStep + 1);
        setVideoKey(prev => prev + 1)
    };
    const handleNextFile = () => {
        setActiveStepFile((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleBackVid = () => {
        setActiveStepVid((prevActiveStep) => prevActiveStep - 1);
        setVideoKey(prev => prev + 1)
    };
    const handleBackFile = () => {
        setActiveStepFile((prevActiveStep) => prevActiveStep - 1);
    };
    const [videoKey, setVideoKey] = useState(0)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])

    /*-------------Posting-------------*/
    const [caption, setCaption] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const ID = await getPost()
        let formData = new FormData()
        formData.append('post_id', ID.length === 0 ? 1 : ID[0].ID + 1)
        formData.append('caption', caption.replace(/'/g, "\\'"))
        formData.append('user', JSON.parse(localStorage.getItem('user')).ID_No)
        if(selectedImage.length > 0){
            selectedImage.forEach(image => {
                formData.append('files', image)
                console.log(image)
            })
        }
        if(selectedVideo.length > 0){
            selectedVideo.forEach(video => {
                formData.append('files', video)
                console.log(video)
            })
        }
        if(selectedFile.length > 0){
            selectedFile.forEach(file => {
                formData.append('files', file)
                console.log(file)
            })
        }
        const postStat = await newPost(formData)
        postStat.status === 'failed' || postStat.status === 'error' ? undefined : (
            setCaption(''),
            setPost(false),
            setSelectedFile([]),
            setSelectedImage([]),
            setSelectedVideo([])
        )
        console.log(postStat.status)
        // const newPost = {
        //     ID : ID.length === 0 ? 1 : ID[0].ID + 1,
        //     postCaption : caption.replace(/'/g, "\\'"),
        //     postDate : new Date(),
        //     postUserID : JSON.parse(localStorage.getItem('user')).ID_No,
        //     isDelete : 0,
        //     file : []
        // }
        onPost
        window.location.reload()
    }
  return (
    <>
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={post}
                onClose={handleClosePost}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                sx={{overflowY : 'scroll'}}
            >
                <Fade in={post}>
                    <div style={{display:'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Card sx={style}>
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <CardContent sx={{overflowY: 'scroll'}}>
                                
                                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                                        <Avatar alt={`${capitalizeWords(user.FirstName)} ${capitalizeWords(user.LastName)}`} src={`${capitalizeWords(user.FirstName)} ${capitalizeWords(user.LastName)}`} sx={{ width: 30, height: 30 }} />
                                        <div style={{width: '100%'}}>
                                            {localStorage.getItem('isLogin') !== 'false' ? `${capitalizeWords(user.FirstName)} ${capitalizeWords(user.LastName)}` : ''}
                                        </div>
                                    </Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2}}>
                                        <EditIcon sx={{ color: '#1976d2', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Tell other what's new..."
                                            multiline
                                            maxRows={4}
                                            variant="standard"
                                            sx={{width: '100%'}}
                                            onChange={(e) => setCaption(e.target.value)}
                                            value={caption}
                                            required
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #cccccc', mt: 1, padding: 1.5, borderRadius: 1}}>
                                        <p style={{margin: 0, flex: 1, fontSize: '12px'}}>Add to your post</p>
                                        <div style={{flex: 1, display: 'flex', justifyContent: 'space-evenly'}}>
                                            <IconButton component="label" aria-label="delete" size="medium">
                                                <PhotoLibraryIcon fontSize="inherit" sx={{color: '#1976d2'}}/>
                                                <PostImage type='file' accept="image/*" multiple onChange={handleSelectedImage}/>
                                            </IconButton>
                                            <IconButton component="label" aria-label="delete" size="medium">
                                                <OndemandVideoIcon fontSize="inherit" sx={{color: '#1976d2'}}/>
                                                <PostImage type='file' accept="video/*" multiple onChange={handleSelectedVideo}/>
                                            </IconButton>
                                            <IconButton component="label" aria-label="delete" size="medium">
                                                <ReceiptLongIcon fontSize="inherit" sx={{color: '#1976d2'}}/>
                                                <PostPdf type='file' accept="application/pdf" multiple onChange={handleSelectedFile}/>
                                            </IconButton>
                                        </div>
                                    </Box>
                                    {selectedImage.length > 0 ? (
                                        <Box sx={{ maxWidth: 350, flexGrow: 1, border: '1px solid #cccccc', mt: 1, padding: 1.5, borderRadius: 1}}>
                                            <Paper
                                                square
                                                elevation={0}
                                                sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: 50,
                                                pl: 2,
                                                bgcolor: 'background.default',
                                                justifyContent: 'center'
                                                }}
                                            >
                                                <Typography sx={{fontSize: '12px'}}>{selectedImage[activeStep].name}</Typography>
                                            </Paper>
                                            <Box sx={{ height: 100, width: 'auto', p: 1, display: 'flex', justifyContent: 'center'}}>
                                                <img src={URL.createObjectURL(selectedImage[activeStep])} width="auto" height="100px"/>
                                            </Box>
                                            <MobileStepper
                                                variant="text"
                                                steps={maxSteps}
                                                position="static"
                                                activeStep={activeStep}
                                                nextButton={
                                                <Button
                                                    size="small"
                                                    onClick={handleNext}
                                                    disabled={activeStep === maxSteps - 1}
                                                >
                                                    Next
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowLeft />
                                                    ) : (
                                                    <KeyboardArrowRight />
                                                    )}
                                                </Button>
                                                }
                                                backButton={
                                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowRight />
                                                    ) : (
                                                    <KeyboardArrowLeft />
                                                    )}
                                                    Back
                                                </Button>
                                                }
                                            />
                                        </Box>
                                    ) : undefined}
                                    {selectedVideo.length > 0 ? (
                                        <Box sx={{ maxWidth: 350, flexGrow: 1, border: '1px solid #cccccc', mt: 1, padding: 1.5, borderRadius: 1}}>
                                            <Paper
                                                square
                                                elevation={0}
                                                sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: 50,
                                                pl: 2,
                                                bgcolor: 'background.default',
                                                justifyContent: 'center'
                                                }}
                                            >
                                                <Typography sx={{fontSize: '12px'}}>{selectedVideo[activeStepVid].name}</Typography>
                                            </Paper>
                                            <Box sx={{ height: 100, width: 'auto', p: 1, display: 'flex', justifyContent: 'center'}}>
                                                <video height="100px" width="auto" autoPlay key={videoKey} loop>
                                                    <source src={URL.createObjectURL(selectedVideo[activeStepVid])} type="video/mp4"></source>
                                                </video>
                                            </Box>
                                            <MobileStepper
                                                variant="text"
                                                steps={vidMaxSteps}
                                                position="static"
                                                activeStep={activeStepVid}
                                                nextButton={
                                                <Button
                                                    size="small"
                                                    onClick={handleNextVid}
                                                    disabled={activeStepVid === vidMaxSteps - 1}
                                                >
                                                    Next
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowLeft />
                                                    ) : (
                                                    <KeyboardArrowRight />
                                                    )}
                                                </Button>
                                                }
                                                backButton={
                                                <Button size="small" onClick={handleBackVid} disabled={activeStepVid === 0}>
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowRight />
                                                    ) : (
                                                    <KeyboardArrowLeft />
                                                    )}
                                                    Back
                                                </Button>
                                                }
                                            />
                                        </Box>
                                    ) : undefined}
                                    {selectedFile.length > 0 ? (
                                        <Box sx={{ maxWidth: 350, flexGrow: 1, border: '1px solid #cccccc', mt: 1, padding: 1.5, borderRadius: 1}}>
                                            <Paper
                                                square
                                                elevation={0}
                                                sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: 50,
                                                pl: 2,
                                                bgcolor: 'background.default',
                                                justifyContent: 'center'
                                                }}
                                            >
                                                <Typography sx={{fontSize: '12px'}}>{selectedFile[activeStepFile].name}</Typography>
                                            </Paper>
                                            {/* <Box sx={{ height: 100, width: 'auto', p: 1, display: 'flex', justifyContent: 'center'}}>
                                                <video height="100px" width="auto" autoPlay loop>
                                                    <source src={URL.createObjectURL(selectedFile[activeStepFile])} type="video/mp4"></source>
                                                </video>
                                            </Box> */}
                                            <MobileStepper
                                                variant="text"
                                                steps={fileMaxSteps}
                                                position="static"
                                                activeStep={activeStepFile}
                                                nextButton={
                                                <Button
                                                    size="small"
                                                    onClick={handleNextFile}
                                                    disabled={activeStepFile === fileMaxSteps - 1}
                                                >
                                                    Next
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowLeft />
                                                    ) : (
                                                    <KeyboardArrowRight />
                                                    )}
                                                </Button>
                                                }
                                                backButton={
                                                <Button size="small" onClick={handleBackFile} disabled={activeStepFile === 0}>
                                                    {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowRight />
                                                    ) : (
                                                    <KeyboardArrowLeft />
                                                    )}
                                                    Back
                                                </Button>
                                                }
                                            />
                                        </Box>
                                    ) : undefined}
                                
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" sx={{width: '100%'}} variant="contained" type="submit" disableElevation>Post</Button>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </Fade>
            </Modal>
        </div>
        <Card variant="outlined" sx={{borderRadius: '10px', marginBottom: 2}}>
            <CardContent sx={{paddingBottom: 0}}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <Avatar alt={`${capitalizeWords(user.FirstName)} ${capitalizeWords(user.LastName)}`} src={`${capitalizeWords(user.FirstName)} ${capitalizeWords(user.LastName)}`} sx={{ width: 30, height: 30, fontSize: '12px'}} />
                    <div style={{width: '100%'}}>
                        <Button variant='outlined' onClick={handleOpenPost} sx={{padding: '5pxpx 20px', textTransform: 'none', textAlign: 'justify', fontWeight: 'normal', color: 'grey', width: '100%', borderRadius: 10, justifyContent: 'flex-start'}}>
                            {`What's new ${localStorage.getItem('isLogin') !== 'false' ? capitalizeWords(user.FirstName) : ''}?`}
                        </Button>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    </>
  )
}
export default Post