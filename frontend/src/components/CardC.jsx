import React, { useState, useRef } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import Me from '../style/images/me.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip';
import {AiFillLike, AiFillHeart, AiOutlineLike} from 'react-icons/ai'
import {FaRegCommentAlt} from 'react-icons/fa'
import {FaLaughSquint, FaSadTear, FaSadCry, FaAngry} from 'react-icons/fa'
import {ImShocked2} from 'react-icons/im'
import CardCCSS from './CardCCSS.module.css'

import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import SeePost from './SeePost';
import Post from './Post';


const CardC = () => {
    const[showFullCaption, setShowFullCaptio] = useState(false)
    const caps = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti. Integer et nunc eget justo hendrerit convallis. Vivamus euismod luctus augue in mattis. Fusce ac auctor nunc. Nunc interdum risus sed auctor tincidunt. Vivamus ac nulla ac mi tincidunt viverra nec nec odio. Suspendisse potenti. Curabitur suscipit erat ut ex efficitur, quis viverra nisi ullamcorper. In hac habitasse platea dictumst. Duis vestibulum, dui ut tempus iaculis, metus justo bibendum tellus, eu pellentesque sapien tellus eget nisl. Proin vehicula diam ac efficitur. Integer sodales bibendum lectus, et bibendum libero blandit non. Curabitur dapibus, urna ut accumsan tincidunt, odio ex vehicula nisi, non vestibulum tellus massa quis neque. In hac habitasse platea dictumst. Integer iaculis eu elit eu luctus. Quisque eget justo nec est varius bibendum. Vivamus bibendum mi sit amet lacinia venenatis. Nulla facilisi. Quisque fermentum augue a purus consequat, et feugiat orci tincidunt. Donec congue ligula vel arcu vulputate tincidunt. Curabitur at augue viverra, pellentesque arcu eu, auctor libero. Nullam vitae mauris in mi maximus euismod. Sed eget tristique odio. Quisque nec felis vitae arcu lacinia pellentesque. Nullam nec justo eget neque pharetra blandit. In ultricies libero in urna mattis, id facilisis ligula consectetur. Fusce vehicula, erat eu blandit pharetra, mi justo tempor justo, a vulputate urna est ut arcu.'
    const captionText = showFullCaption ? caps : `${caps.substring(0, 400)}...Show more`
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
    let [like, setLike] = useState('none')
   
    const handleSetLike = (newLike) => {
        if(like === newLike){
            handleLikeDecrement()
            setLike('none')
        }
        else{
            handleAddtoLikeList()
            handleLikeIncrement()
            setLike(newLike)
        }
    }
    let [countLike, setCountLike] = useState(7)
    const handleLikeIncrement = () => {
        setCountLike((prevState) => prevState + 1)
    }
    const handleLikeDecrement = () => {
        setCountLike((prevState) => prevState - 1)
    }
    let [likeList, setLikeList] = useState('Jhobert Erato and others...')
    const handleAddtoLikeList = () => {
        setLikeList((prevState) => `You, ${prevState}`)
    }
    const handleRemovetoLikeList = () => {
        setLikeList((prevState) => `You, ${prevState}`)
    }

    /*Comment to */
    const inputComment = useRef(null)
    const handleFocusComment = () => {
        if (inputComment.current) {
            inputComment.current.focus();
        }
    }
    const [showComment, setShowComment] = useState(false)
    const handleShowComment = () => {
        showComment ? setShowComment(false) : setShowComment(true)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setData((current) => ({ ...current, status: 'loading' }));
    //     try {
    //         // Replace timeout with real backend operation
    //         setTimeout(() => {
    //         setData({ email: '', status: 'sent' });
    //         }, 1500);
    //     } catch (error) {
    //         setData((current) => ({ ...current, status: 'failure' }));
    //     }
    // };

    const [commentList, setCommentList] = useState([
        {
            id: 0,
            name: `Jude David Acula`,
            department: `Systems`,
            avatar: `/static/images/avatar/1.jpg`,
            comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti. Integer et nunc eget justo hendrerit convallis. Vivamus euismod luctus augue in mattis. Fusce ac auctor nunc. Nunc interdum risus sed auctor tincidunt. Vivamus ac nulla ac mi tincidunt viverra nec nec odio. Suspendisse potenti. Curabitur suscipit erat ut ex efficitur, quis viverra nisi ullamcorper. In hac habitasse platea dictumst. Duis vestibulum, dui ut tempus iaculis, metus justo bibendum tellus, eu pellentesque sapien tellus eget nisl. Proin vehicula diam ac efficitur. Integer sodales bibendum lectus, et bibendum libero blandit non. Curabitur dapibus, urna ut accumsan tincidunt, odio ex vehicula nisi, non vestibulum tellus massa quis neque. In hac habitasse platea dictumst. Integer iaculis eu elit eu luctus. Quisque eget justo nec est varius bibendum. Vivamus bibendum mi sit amet lacinia venenatis. Nulla facilisi. Quisque fermentum augue a purus consequat, et feugiat orci tincidunt. Donec congue ligula vel arcu vulputate tincidunt. Curabitur at augue viverra, pellentesque arcu eu, auctor libero. Nullam vitae mauris in mi maximus euismod. Sed eget tristique odio. Quisque nec felis vitae arcu lacinia pellentesque. Nullam nec justo eget neque pharetra blandit. In ultricies libero in urna mattis, id facilisis ligula consectetur. Fusce vehicula, erat eu blandit pharetra, mi justo tempor justo, a vulputate urna est ut arcu.`,
            showFullComment: false,
            date: 'September 12, 2023',
            time: '1:30 PM'
        },
        {
            id: 1,
            name: `Kent Steven Yedra`,
            department: `Systems`,
            avatar: `/static/images/avatar/2.jpg`,
            comment: `-Wish I could come, but I'm out of town this week...`,
            showFullComment: false,
            date: 'September 12, 2023',
            time: '2:05 PM'
        },
        {
            id: 2,
            name: `Rencell Arcillas`,
            department: `Systems`,
            avatar: `/static/images/avatar/3.jpg`,
            comment: `-Do you have Paris recommendations? Have you ever there?`,
            showFullComment: false,
            date: 'September 12, 2023',
            time: '2:57 PM'
        },
    ])
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
    const handleSubmitMyComment = (event) => {
        event.preventDefault()
        const newComment = {
            id: commentList[commentList.length - 1].id + 1,
            name: `Jhobert Erato`,
            department: `Systems`,
            avatar: `/static/images/avatar/3.jpg`,
            comment: myComment,
            showFullComment: false,
            date: 'September 13, 2023',
            time: '07:12 AM'
        }
        setCommentList([...commentList,newComment])
        setMyComment('')
        event.target.clear
    }
    const validComment = (strng) => {
        const regex = /\S/
        return regex.test(strng)
    }

    /*---------------zoom-----------------*/
    const content = {
        id: 1,
        caption: caps,
        media: itemData
    }
    return (
        <Box sx={{ minWidth: 275, mb: 2}}>
            <SeePost content={content}/>
            <Post />
            <Card variant="outlined" sx={{borderRadius: '10px', marginTop: 2}}>
                <CardContent sx={{paddingBottom: 0}}>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src={Me} />
                        <div>
                            <Typography variant="body2">
                                Jhobert Erato
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: '12px'}} color="text.secondary">
                                12 hours ago
                            </Typography>
                        </div>
                    </Stack>
                    <br />
                    <Button variant='body1' sx={{padding: 0, textTransform: 'none', textAlign: 'justify', fontWeight: 'normal'}} onClick={() => setShowFullCaptio(prevState => !prevState)}>{captionText}</Button>
                    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={'auto'}>
                        {itemData.map((item) => (
                        <ImageListItem key={item.img} onClick={() => {console.log("yawa")}}>
                            <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            />
                        </ImageListItem>
                        ))}
                    </ImageList>
                    <div className={CardCCSS['likesComments']}>
                        <AvatarGroup sx={{ flexDirection: 'row-reverse' }}>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#0454d9'}}>
                                <AiFillLike color='#fff' size={20} style={{margin: '0'}}/>  
                            </Avatar>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffbf00'}}>
                                <FaLaughSquint color='#fff' size={20} style={{margin: '0'}}/>  
                            </Avatar>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: 'red'}}>
                                <AiFillHeart color='#fff' size={20} style={{margin: '0'}}/> 
                            </Avatar>
                            <Button size="small" sx={{paddingBottom: 0, textTransform: 'none', paddingLeft: '1px'}}>
                                <Typography sx={{ mb: 1.5, fontSize: '12px', marginBottom: 0}} color="text.secondary">
                                    {likeList}
                                </Typography>
                            </Button>
                        </AvatarGroup>
                        <AvatarGroup sx={{ flexDirection: 'row', display: {xs: 'none', md: 'flex'}}}>
                            <Button size="small" sx={{paddingBottom: 0, textTransform: 'none', paddingLeft: '1px'}} onClick={() => handleShowComment()}>
                                <Typography sx={{ mb: 1.5, fontSize: '12px', marginBottom: 0}} color="text.secondary">
                                    {commentList.length === 1 ? `only one comment` : `${commentList.length} comments`}
                                </Typography>
                            </Button>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px'}} src={Me}/>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px'}} src={Me}/>
                            <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px'}} src={Me}/>
                        </AvatarGroup>
                    </div>
                    <hr />
                </CardContent>
                <CardContent sx={{padding: 1}}>
                    {isLogin ? (
                        <div className={CardCCSS['btnLikeComments']}>
                            <div>
                                <Button size="small" sx={{color: 'grey'}}
                                    aria-owns={open ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handleHoverOpen('top-start')}
                                    onBlur={handleHoverClose('top-start')}
                                    onClick={() => handleSetLike('like')}
                                >   {
                                        like === 'none' ? (
                                            <AiOutlineLike color='grey' size={20}/>
                                        ) : like === 'like' ? (
                                            <AiFillLike color='blue' size={20}/>
                                        ) : like === 'heart' ? (
                                            <AiFillHeart color='red' size={20}/>
                                        ) : like === 'laugh' ? (
                                            <FaLaughSquint color='ffbf00' size={20}/>
                                        ) : like === 'sad' ? (
                                            <FaSadTear color='ffbf00' size={20}/>
                                        ) : like === 'wow' ? (
                                            <ImShocked2 color='ffbf00' size={20}/>
                                        ) : (
                                            <FaAngry color='ffa187' size={20}/>
                                        )
                                    }&nbsp;{countLike}
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
                                                <div className={CardCCSS['likes-items']}>
                                                    <Avatar size='sm' alt="Cindy Baker" sx={{width: '30px', height: '30px', bgcolor: '#ffa187'}} onClick={() => handleSetLike('angry')}>
                                                        <FaAngry color='#fff' size={20} style={{margin: '0'}}/>  
                                                    </Avatar>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Fade>
                                    )}
                                </Popper>                                                                                                                                                                                            
                            </div>
                            <div>
                                <Button size="small" sx={{color: 'grey'}} onClick={handleFocusComment}>
                                    <FaRegCommentAlt color='grey' size={20}/>&nbsp;{commentList.length}
                                </Button>
                            </div>
                            <div style={{marginRight: 10, flex: 3}}>
                                <Paper
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', margin: '0 5 2 2'}}
                                >
                                    <Avatar alt="Remy Sharp" src={Me} sx={{width: 24, height: 24}}/>
                                    <form onSubmit={handleSubmitMyComment} style={{width: '100%', display: 'flex'}}>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Write a comment..."
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            required
                                            value={myComment}
                                            onChange={handleChangeMyComment}
                                            autoFocus
                                        />
                                        {validComment(myComment) ? (
                                            <IconButton sx={{ p: '10px' }} aria-label="search" type={"submit"}>
                                            <SendIcon color='blue' />
                                            </IconButton>
                                        ): undefined}
                                    </form>
                                </Paper>
                                {showComment ? (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {(commentList.slice().reverse()).map((comments, index) => (
                                            <React.Fragment key={index}>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={comments.name} src={comments.avatar} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={comments.name}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Button variant='body1' sx={{padding: 0, textTransform: 'none', textAlign: 'justify', fontWeight: 'normal'}}
                                                                    onClick={() => handleShowFullComment(comments.id, !comments.showFullComment)}>
                                                                    {!comments.showFullComment && comments.comment.length > 400 ? `${(comments.comment).substring(0, 400)}...Show more` : comments.comment}
                                                                </Button>
                                                                <br />
                                                                <span sx={{ mt: 2, fontSize: '8px', marginBottom: 0}} color="text.secondary">
                                                                    {`${comments.date} ${comments.time}`}
                                                                </span>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                ) : undefined}
                                
                            </div>
                        </div>
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