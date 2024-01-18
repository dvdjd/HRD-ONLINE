import React, { useState, useRef, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip';
import {AiFillLike, AiFillHeart, AiOutlineLike} from 'react-icons/ai'
import {FaRegCommentAlt} from 'react-icons/fa'
import {FaLaughSquint, FaSadTear, FaSadCry, FaAngry} from 'react-icons/fa'
import {ImShocked2} from 'react-icons/im'
import CardCCSS from './CardCCSS.module.css'
import SendIcon from '@mui/icons-material/Send';

import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import SeePost from './SeePost';
import LikeList from './LikeList';

import moment from 'moment-timezone';
import { Worker, Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import samplePDF from '../style/images/pdf-succinctly.pdf'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin, RenderEnterFullScreenProps  } from '@react-pdf-viewer/full-screen';

import { getUser, reactPost, countReact, checkReact, postComment, getComments } from '../services/LandingPageAPI';
import { capitalizeWords, getTime } from '../utils/global';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';


const CardC = ({post, deletePost}) => {
    const[showFullCaption, setShowFullCaptio] = useState(false)
    const caps = post.p.postCaption
    const captionText = showFullCaption ? caps : caps.length > 400 ? `${caps.substring(0, 400)}...Show more` : caps
    const [pdfAttached, setPdfAttached] = useState("")
    const itemData = [
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            type: 'image',
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];
    const isLogin = true

    const [postDate, setPostDate] = useState(null)

    /*Yung react na button na parang facebook */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const handleHoverOpen = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const handleHoverClose = (newPlacement) => (event) => {
        setAnchorEl(null);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    let [like, setLike] = useState(undefined)
    const handleSetLike = (l) => {
        let mode = 0
        if(like === l){
            setLike('none')
            mode = 2
        }
        else{
            setLike(l)
            mode = 1
        }
        const rPost = async () => {
            const r = await reactPost({
                post_id : post.p.ID,
                user_id : `${JSON.parse(localStorage.getItem('user')).ID_No}`,
                react_type : l,
                mode: mode
            })
            return r
        }
        rPost()
    }
    let [countLike, setCountLike] = useState(0)
    let [likeList, setLikeList] = useState({data: []})

    /*Comment to */
    const inputComment = useRef(null)
    const [showComment, setShowComment] = useState(false)
    const handleShowComment = () => {
        showComment ? setShowComment(false) : setShowComment(true)
    }
    const [commentList, setCommentList] = useState([])
    // const [commentList, setCommentList] = useState([
    //     {
    //         id: 0,
    //         name: `Jude David Acula`,
    //         department: `Systems`,
    //         avatar: `/static/images/avatar/1.jpg`,
    //         comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti. Integer et nunc eget justo hendrerit convallis. Vivamus euismod luctus augue in mattis. Fusce ac auctor nunc. Nunc interdum risus sed auctor tincidunt. Vivamus ac nulla ac mi tincidunt viverra nec nec odio. Suspendisse potenti. Curabitur suscipit erat ut ex efficitur, quis viverra nisi ullamcorper. In hac habitasse platea dictumst. Duis vestibulum, dui ut tempus iaculis, metus justo bibendum tellus, eu pellentesque sapien tellus eget nisl. Proin vehicula diam ac efficitur. Integer sodales bibendum lectus, et bibendum libero blandit non. Curabitur dapibus, urna ut accumsan tincidunt, odio ex vehicula nisi, non vestibulum tellus massa quis neque. In hac habitasse platea dictumst. Integer iaculis eu elit eu luctus. Quisque eget justo nec est varius bibendum. Vivamus bibendum mi sit amet lacinia venenatis. Nulla facilisi. Quisque fermentum augue a purus consequat, et feugiat orci tincidunt. Donec congue ligula vel arcu vulputate tincidunt. Curabitur at augue viverra, pellentesque arcu eu, auctor libero. Nullam vitae mauris in mi maximus euismod. Sed eget tristique odio. Quisque nec felis vitae arcu lacinia pellentesque. Nullam nec justo eget neque pharetra blandit. In ultricies libero in urna mattis, id facilisis ligula consectetur. Fusce vehicula, erat eu blandit pharetra, mi justo tempor justo, a vulputate urna est ut arcu.`,
    //         showFullComment: false,
    //         date: 'September 12, 2023',
    //         time: '1:30 PM'
    //     },
    //     {
    //         id: 1,
    //         name: `Kent Steven Yedra`,
    //         department: `Systems`,
    //         avatar: `/static/images/avatar/2.jpg`,
    //         comment: `-Wish I could come, but I'm out of town this week...`,
    //         showFullComment: false,
    //         date: 'September 12, 2023',
    //         time: '2:05 PM'
    //     },
    //     {
    //         id: 2,
    //         name: `Rencell Arcillas`,
    //         department: `Systems`,
    //         avatar: `/static/images/avatar/3.jpg`,
    //         comment: `-Do you have Paris recommendations? Have you ever there?`,
    //         showFullComment: false,
    //         date: 'September 12, 2023',
    //         time: '2:57 PM'
    //     },
    // ])
    const handleShowFullComment = (id, stat) => {
        const updatedCommentList = [...commentList]
        const indexToUpdate = updatedCommentList.findIndex(item => item.id === id)
        if(indexToUpdate !== -1){
            updatedCommentList[indexToUpdate].showFullComment = stat
            setCommentList(updatedCommentList)
        }
    }
    const [myComment, setMyComment] = useState('')
    const handleChangeMyComment = (event) => {
        setMyComment(event.target.value)
    }
    const handleSubmitMyComment = async (event) => {
        event.preventDefault()
        const newComment = {
            // id: commentList[commentList.length - 1].id + 1,
            Post_ID : post.p.ID,
            commentUserID: JSON.parse(localStorage.getItem('user')).ID_No,
            comment: myComment.replace(/'/g, "\\'"),
            showFullComment: false,
            commentDateTime: "Just Now",
            FirstName : JSON.parse(localStorage.getItem('user')).FirstName,
            LastName : JSON.parse(localStorage.getItem('user')).LastName,
            Department : JSON.parse(localStorage.getItem('user')).Department
        }
        const pComment = await postComment({post_id: post.p.ID, user_id: JSON.parse(localStorage.getItem('user')).ID_No, comment: myComment})

        setCommentList([...commentList,newComment])
        setMyComment('')
        event.target.clear
    }
    const validComment = (strng) => {
        const regex = /\S/
        return regex.test(strng)
    }

    //PDF
    const newplugin = defaultLayoutPlugin()
    const fullScreenPluginInstance = fullScreenPlugin()
    const { EnterFullScreen } = fullScreenPluginInstance;
    /*---------------zoom-----------------*/
    const content = {
        id: post.p.ID,
        caption: caps,
        media: post.p.file
    }
    const seePost = useRef()    
    const likes = useRef()

    const [poster, setPoster] = useState(null)
    useEffect(() => {
        const today = new Date()
        const today2 = new Date()
        today.setHours(0, 0, 0, 0)
        if(moment(post.p.postDate).tz('Asia/Manila').format('MMMM DD, YYYY') === moment(today).tz('Asia/Manila').format('MMMM DD, YYYY')){
            if(today2.getHours() == moment(post.p.postDate).tz('Asia/Manila').format('HH')){
                setPostDate('Just Now')
            }
            else{
                setPostDate(`${today2.getHours() - moment(post.p.postDate).tz('Asia/Manila').format('HH')} Hour/s Ago`)
            }
        }
        else{
            setPostDate(moment(post.p.postDate).tz('Asia/Manila').format('MMMM DD, YYYY hh:MM A'))
        }

        const user = async () => {
            const u = await getUser({id : post.p.postUserID})
            setPoster(capitalizeWords(`${u[0].FirstName} ${u[0].LastName}`))
        }
        user()

        const cReact = async () => {
            const cr = await countReact({post_id: post.p.ID})
            setLikeList(cr)
            let c = 0
            cr.data.forEach(element => {
                c += element.count
            });
            setCountLike(c)
        }
        cReact()

        const chReact = async() => {
            const c = await checkReact({post_id: post.p.ID, user_id: JSON.parse(localStorage.getItem('user')).ID_No})
            c.data.length > 0 ? setLike(c.data[0].reactType) : setLike('none')
        }
        chReact()

        const gComments = async () => {
            const gc = await getComments({post_id : post.p.ID})
            if(gc.length > 0){
                setCommentList(gc) 
            }
                
        }
        gComments()

        setPdfAttached(post.p.file[0] === undefined || post.p.file[0].type !== "application/pdf" ? "" : post.p.file[0].filename)
        //console.log(post.p.file[0] === undefined || post.p.file[0].type !== "application/pdf" ? "" : post.p.file[0].filename)
    }, [])

    useEffect(() => {
        const cReact = async () => {
            const cr = await countReact({post_id: post.p.ID})
            setLikeList(cr)
            let c = 0
            cr.data.forEach(element => {
                c += element.count
            });
            setCountLike(c)
        }
        cReact()
    }, [like])

    /*---------------------Edit/Delete Post -------------------*/
    const [anchorEditPost, setAnchorEditPost] = useState(null)
    const[openEditPost, setOpenEditPost] = useState(false)
    const [editPlacement, setEditPlacement] = useState()

    const handleOpenEdit = (newPlacement) => (event) => {
        setAnchorEditPost(event.currentTarget)
        setOpenEditPost((prev) => editPlacement !== newPlacement || !prev)
        setEditPlacement(newPlacement)
    }
    const handleDeletePost = () => {
        deletePost(post.p.postID)
        setOpenEditPost(false)
    }
    return (
        <Box sx={{ minWidth: 275, mb: 2}}>
            <LikeList postID={post.p.ID} ref={likes}/>
            <SeePost content={post} ref={seePost}/>
            <Card variant="outlined" sx={{borderRadius: '10px'}}>
                <CardContent sx={{paddingBottom: 0}}>
                    <div className={CardCCSS['likesComments']} style={{alignItems: 'center'}}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt={poster} src={poster} />
                            <div>
                                <Typography variant="body2">
                                    {poster}
                                </Typography>
                                <Typography sx={{ mb: 1.5, fontSize: '12px'}} color="text.secondary">
                                    {postDate}
                                </Typography>
                            </div>
                        </Stack>
                        {localStorage.getItem('isLogin') === 'true' && JSON.parse(localStorage.getItem('user')).ID_No === post.p.postUserID ? (
                            <>
                                <Popper open={openEditPost} anchorEl={anchorEditPost} placement={editPlacement} transition>
                                    {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: 'column', borderRadius: 2}}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                            >
                                            {/* <ListItemButton>
                                                <ListItemIcon>
                                                    <EditIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="&nbsp;&nbsp;Edit&nbsp;&nbsp;"/>
                                            </ListItemButton> */}
                                            <ListItemButton sx={{":hover" : {background: 'rgba(255,114,118, .2)'}}} onClick={handleDeletePost}>
                                                <ListItemIcon sx={{color: 'red'}}>
                                                    <DeleteIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" sx={{color: 'red'}}/>
                                            </ListItemButton>
                                        </List>
                                    </Fade>
                                    )}
                                </Popper>
                                <IconButton aria-label="settings" onClick={handleOpenEdit('left-start')}>
                                    <MoreHorizIcon size={10} />
                                </IconButton>
                            </>
                            
                        ) : undefined}
                    </div>
                    
                    <br />
                    <Button variant='body1' sx={{padding: 0, textTransform: 'none', textAlign: 'justify', fontWeight: 'normal'}} onClick={() => setShowFullCaptio(prevState => !prevState)}>
                        <pre>{captionText}</pre>
                    </Button>
                    {post.p.file.length > 0 ? post.p.file.length > 1 ? (
                        <ImageList sx={{ width: '100%', height: 450, cursor: 'pointer' }} cols={post.p.file.length % 3 == 0 ? 3 : 2} rowHeight={'auto'}>
                            {post.p.file.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ImageListItem key={item.img} onClick={() => seePost.current?.handleOpenPost()}>
                                        {item.type == 'image/jpeg' ||  item.type == 'image/jpg' || item.type == 'image/png' ? (
                                            <img
                                            src={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.filename}
                                            loading="lazy"
                                            style={{width: '100%'}}
                                            />
                                        ) : item.type == 'video/mp4' ? (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                poster={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                                style={{width: '100%', objectFit: 'contain'}}
                                            >
                                                <source
                                                src={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                                type="video/mp4"
                                                />
                                            </video>
                                        ) : (
                                            <img
                                                src={`https://th.bing.com/th/id/OIP.OzkFjeuoXNdMHiS3ZUL-swHaDm?w=349&h=169&c=7&r=0&o=5&dpr=1.4&pid=1.7`}
                                                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.filename}
                                                loading="lazy"
                                                style={{width: '100%'}}
                                            />
                                        ) }
                                        
                                    </ImageListItem>
                                </React.Fragment>
                            ))}
                        </ImageList>
                    ) : 
                        post.p.file.map((item, index) => (
                            <React.Fragment key={index}>
                                <ImageListItem key={item.img}>
                                    {item.type == 'image/jpeg' ||  item.type == 'image/jpg' || item.type == 'image/png'? (
                                        <img
                                        src={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.filename}
                                        loading="lazy"
                                        style={{width: '100%', height: 'auto'}}
                                        />
                                    ) : item.type == 'video/mp4' ? (
                                        <video
                                            // autoPlay
                                            controls
                                            // loop
                                            muted
                                            poster={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                            style={{width: '100%', height: '600px', objectFit: 'contain'}}
                                        >
                                            <source
                                            src={`http://192.168.5.3:4000/uploads/${item.filename}`}
                                            type="video/mp4"
                                            />
                                        </video>
                                    ) : (
                                        <div className="pdf-container" style={{height: '600px'}}>
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                <EnterFullScreen />
                                            </div>
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                
                                                {/* <Viewer fileUrl={samplePDF} plugins={[newplugin]} /> */}
                                                <Viewer fileUrl={pdfAttached === "" ? samplePDF : `http://192.168.5.3:4000/files/${pdfAttached}`} plugins={[fullScreenPluginInstance]} />
                                            </Worker>
                                        </div>
                                    ) }
                                    
                                </ImageListItem>
                            </React.Fragment>
                            
                        ))
                     : undefined}
                    <div className={CardCCSS['likesComments']} style={{marginTop: 15}}>
                        {likeList.data.length > 0 ? (
                            <AvatarGroup sx={{ flexDirection: 'row-reverse' }}>
                                {likeList.data.slice(0, 3).map((like, index) => (
                                    <div key={index}>
                                        {like.reactType === 'laugh' ? (
                                            <Avatar key={index} size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#ffbf00'}}>
                                                <FaLaughSquint color='#fff' size={15} style={{margin: '0'}}/> 
                                            </Avatar>
                                        ) : like.reactType === 'like' ? (
                                            <Avatar key={index} size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#0454d9'}}>
                                                <AiFillLike color='#fff' size={15} style={{margin: '0'}}/>
                                            </Avatar>
                                        ) : like.reactType === 'heart' ? (
                                            <Avatar key={index} size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: 'red'}}>
                                                <AiFillHeart color='#fff' size={15} style={{margin: '0'}}/>
                                            </Avatar>
                                             
                                        ) : like.reactType === 'wow' ? (
                                            <Avatar key={index} size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#ffbf00'}}>
                                                <ImShocked2 color='#fff' size={15} style={{margin: '0'}}/> 
                                            </Avatar>
                                        ) : like.reactType === 'sad' ? (
                                            <Avatar key={index} size='sm' alt="HRD" sx={{width: '25px', height: '25px', bgcolor: '#ffbf00'}}>
                                                <FaSadTear color='#fff' size={20} style={{margin: '0'}}/>
                                            </Avatar>
                                        ) : undefined}
                                    </div>
                                ))}
                                
                                <Button sx={{paddingBottom: 0, textTransform: 'none', paddingLeft: '3px', width: '5px', height: '30px', justifyContent: 'flex-start', paddingTop: 0}} onClick={() => likes.current?.handleOpen()}>
                                    <Typography sx={{ mb: 1.5, fontSize: '14px', marginBottom: 0}} color="text.secondary">
                                        {countLike}
                                    </Typography>
                                </Button>
                            </AvatarGroup>
                        ) : undefined}
                        {/* {commentList.length > 0 ? (
                            <AvatarGroup sx={{ flexDirection: 'row', display: {xs: 'none', md: 'flex'}}}>
                                <Button size="small" sx={{paddingBottom: 0, textTransform: 'none', paddingLeft: '1px'}} onClick={() => handleShowComment()}>
                                    <Typography sx={{ mb: 1.5, fontSize: '12px', marginBottom: 0}} color="text.secondary">
                                        {commentList.length === 1 ? `only one comment` : `${commentList.length} comments`}
                                    </Typography>
                                </Button>
                                {commentList.slice(0, 3).map((comment, index) => (
                                    <Avatar key={index} size='sm' alt={`${capitalizeWords(comment.FirstName)} ${capitalizeWords(comment.LastName)}`} sx={{width: '30px', height: '30px'}} src={`${capitalizeWords(comment.FirstName)} ${capitalizeWords(comment.LastName)}`}/>
                                ))}
                                
                            </AvatarGroup>
                        ) : undefined} */}
                        
                    </div>
                    <hr />
                </CardContent>
                <CardContent sx={{padding: 1}}>
                    {localStorage.getItem('isLogin') === 'true' ?  (
                        <>
                            <div className={CardCCSS['btnLikeComments']}>
                                <div>
                                    <Button size="small" sx={{color: 'grey'}}
                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={handleHoverOpen('top-start')}
                                        onBlur={handleHoverClose('top-start')}
                                        onClick={() => handleSetLike('like')}
                                    >   {
                                            like == 'none' ? (
                                                <AiOutlineLike color='grey' size={20}/>
                                            ) : like == 'like' ? (
                                                <AiFillLike color='blue' size={20}/>
                                            ) : like == 'heart' ? (
                                                <AiFillHeart color='red' size={20}/>
                                            ) : like == 'laugh' ? (
                                                <FaLaughSquint color='ffbf00' size={20}/>
                                            ) : like == 'sad' ? (
                                                <FaSadTear color='ffbf00' size={20}/>
                                            ) : like == 'wow' ? (
                                                <ImShocked2 color='ffbf00' size={20}/>
                                            ) : (
                                                <FaAngry color='ffa187' size={20}/>
                                            )
                                        }
                                    </Button>
                                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                        {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <div className={CardCCSS['likes']}>
                                                    <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#0454d9'}} onClick={() => handleSetLike('like')}>
                                                            <AiFillLike color='#fff' size={20} style={{margin: '0'}}/>  
                                                        </Avatar>
                                                    </div>
                                                    <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: 'red'}} onClick={() => handleSetLike('heart')}>
                                                            <AiFillHeart color='#fff' size={20} style={{margin: '0'}}/> 
                                                        </Avatar>
                                                    </div>
                                                    <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffbf00'}} onClick={() => handleSetLike('laugh')}>
                                                            <FaLaughSquint color='#fff' size={20} style={{margin: '0'}}/>  
                                                        </Avatar>
                                                    </div>
                                                    <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffbf00'}} onClick={() => handleSetLike('sad')}>
                                                            <FaSadTear color='#fff' size={20} style={{margin: '0'}}/>  
                                                        </Avatar>
                                                    </div>
                                                    <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffbf00'}} onClick={() => handleSetLike('wow')}>
                                                            <ImShocked2 color='#fff' size={20} style={{margin: '0'}}/>  
                                                        </Avatar>
                                                    </div>
                                                    {/* <div className={CardCCSS['likes-items']}>
                                                        <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffa187'}} onClick={() => handleSetLike('angry')}>
                                                            <FaAngry color='#fff' size={20} style={{margin: '0'}}/>  
                                                        </Avatar>
                                                    </div> */}
                                                </div>
                                            </Paper>
                                        </Fade>
                                        )}
                                    </Popper>                                                                                                                                                                                            
                                </div>
                                {/* <div>
                                    <Button size="small" sx={{color: 'grey'}} onClick={() => handleShowComment()}>
                                        <FaRegCommentAlt color='grey' size={20}/>
                                    </Button>
                                </div>
                                <div style={{marginRight: 10, flex: 3}}>
                                    <Paper
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', margin: '0 5 2 2'}}
                                    >
                                        <Avatar alt={`${capitalizeWords(JSON.parse(localStorage.getItem('user')).FirstName)} ${capitalizeWords(JSON.parse(localStorage.getItem('user')).LastName)}`} src={`${capitalizeWords(JSON.parse(localStorage.getItem('user')).FirstName)} ${capitalizeWords(JSON.parse(localStorage.getItem('user')).LastName)}`} sx={{width: 24, height: 24}}/>
                                        <form onSubmit={handleSubmitMyComment} style={{width: '100%', display: 'flex'}}>
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Write a comment..."
                                                inputProps={{ 'aria-label': 'search google maps' }}
                                                required
                                                value={myComment}
                                                onChange={handleChangeMyComment}
                                                // autoFocus
                                            />
                                            {validComment(myComment) ? (
                                                <IconButton sx={{ p: '10px', color: 'blue' }} aria-label="search" type={"submit"}>
                                                <SendIcon />
                                                </IconButton>
                                            ): undefined}
                                        </form>
                                    </Paper>
                                </div> */}
                            </div>
                            <div className={CardCCSS['btnLikeComments']}>
                                {showComment ? (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {commentList.length > 0 ? commentList.map((comments, index) => (
                                            <React.Fragment key={index}>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={`${capitalizeWords(comments.FirstName)} ${capitalizeWords(comments.LastName)}`} src={`${capitalizeWords(comments.FirstName)} ${capitalizeWords(comments.LastName)}`} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${capitalizeWords(comments.FirstName)} ${capitalizeWords(comments.LastName)}`}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Button variant='body1' sx={{padding: 0, textTransform: 'none', textAlign: 'justify', fontWeight: 'normal'}}
                                                                    onClick={() => handleShowFullComment(comments.id, !comments.showFullComment)}>
                                                                    {!comments.showFullComment && comments.comment.length > 400 ? `${(comments.comment).substring(0, 400)}...Show more` : comments.comment}
                                                                </Button>
                                                                <br />
                                                                <span sx={{ mt: 2, fontSize: '8px', marginBottom: 0}} color="text.secondary">
                                                                    {comments.commentDateTime == "Just Now" ? "Just Now" : `${moment(comments.commentDateTime).tz('Asia/Manila').format('MMMM DD, YYYY hh:MM A')}`}
                                                                </span>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </React.Fragment>
                                        )) : undefined}
                                    </List>
                                ) : undefined}
                            </div>
                        </>
                        
                    ) : (
                        <Tooltip title="Kindly login to access full features =)" placement="right">
                            <Button size="small">Learn More</Button>
                        </Tooltip>
                    )}
                </CardContent>
            </Card>
        </Box>
    )
}

export default CardC