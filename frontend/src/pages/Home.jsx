import React, { useEffect, useState } from 'react'
import CardA from '../components/CardA'
import CardB from '../components/CardB'
import CardC from '../components/CardC'
import style from '../style/style.module.css'
import Post from '../components/Post';
import { isAdmin } from '../utils/global'
import PresidentMessage from '../components/PresidentMessage'
import { deletePost } from '../services/LandingPageAPI'
import { useRef } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box';
import noData from '../style/images/noData.png'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/actions'

const Home = () => {
  const isMobile = useMediaQuery("(max-width:600px)")
  const presidentMessage = useRef()
  const dispatch = useDispatch()
  const post = useSelector(state => state.post.posts)

  const [posts, setPost] = useState([])
  const c = useRef()

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter(post => post.postID !== id)
    setPost(updatedPosts)

    const delPost = async () => {
      const d = await deletePost({post_id: id})
    }
    delPost()
    console.log(id)
  }

  const handlePost = () => {
    // const kuninAngPost = async () => {
    //   const lagayan = await getPost()
    //   setPost(lagayan)
    // }
    // kuninAngPost()
    dispatch(getPosts())
  }

  useEffect(() => {
    //presidentMessage.current?.handleClick()
    dispatch(getPosts())
    if (c.current) {
      c.current.scrollTo(0, 0);
    }
  }, [])

  useEffect(() => {
    setPost(post)
  }, [post])
  return (
    <>
      {isMobile ? (
        <br />
      ) : (<>
        <br /><br />
      </>)}
      
      <div className={style['flex-container']}>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardA />
          </div>
          <div className={`${style["flex-item"]} ${style["large"]}`} ref={c}>
              {isAdmin() === 1 ? <Post onPost={handlePost}/> : (<></>)}
              {posts.length > 0 ? posts.map((p) => (
                <React.Fragment key={p?.ID}>
                  <CardC post={{p}} deletePost={handleDeletePost}/>
                </React.Fragment>
              )) : (
                <Box sx={{ minWidth: 275, mb: 2}}>
                  <Card variant="outlined" sx={{borderRadius: '10px'}}>
                    <CardContent sx={{paddingBottom: 0}}>
                      <img src={noData} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}/>
                    </CardContent>
                  </Card>
                </Box>
              )}
          </div>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardB />
          </div>
      </div>
      <PresidentMessage ref={presidentMessage} />
    </>
  )
}

export default Home