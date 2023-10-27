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
import Box from '@mui/material/Box';
import noData from '../style/images/noData.png'
import { getPost } from '../services/LandingPageAPI'
const Home = () => {
  const presidentMessage = useRef()
  const [posts, setPost] = useState([])
  const c = useRef()
  useEffect(() => {
    //presidentMessage.current?.handleClick()
    const kuninAngPost = async () => {
      const lagayan = await getPost()
      setPost(lagayan)
    }

    kuninAngPost()
    if (c.current) {
      c.current.scrollTo(0, 0);
    }
  }, [])

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter(post => post.ID !== id)
    setPost(updatedPosts)

    const delPost = async () => {
      const d = await deletePost({post_id: id})
    }
    delPost()
  }

  const handlePost = () => {
    const kuninAngPost = async () => {
      const lagayan = await getPost()
      setPost(lagayan)
    }
    kuninAngPost()
  }
  return (
    <>
      <br /><br /><br /><br />
      <div className={style['flex-container']}>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardA />
          </div>
          <div className={`${style["flex-item"]} ${style["large"]}`} ref={c}>
              {isAdmin() === 1 ? <Post onPost={handlePost}/> : (<></>)}
              {posts.length > 0 ? posts.map((p, index) => (
                <React.Fragment key={index}>
                  <CardC post={{p}} deletePost={handleDeletePost}/>
                </React.Fragment>
              )) : (
                <Box sx={{ minWidth: 275, mb: 2}}>
                  <Card variant="outlined" sx={{borderRadius: '10px'}}>
                    <CardContent sx={{paddingBottom: 0}}>
                      <img src={noData} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px'}}/>
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