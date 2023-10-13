import React, { useEffect, useState } from 'react'
import CardA from '../components/CardA'
import CardB from '../components/CardB'
import CardC from '../components/CardC'
import style from '../style/style.module.css'
import Post from '../components/Post';
import PresidentMessage from '../components/PresidentMessage'
import { useRef } from 'react'

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
  return (
    <>
      <br /><br /><br /><br />
      <div className={style['flex-container']}>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardA />
          </div>
          <div className={`${style["flex-item"]} ${style["large"]}`} ref={c}>
              {localStorage.getItem('isLogin') === 'true' ? <Post /> : (<></>)}
              {posts.map((p, index) => (
                <React.Fragment key={index}>
                  <CardC post={{p}}/>
                </React.Fragment>
              ))}
          </div>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardB />
          </div>
      </div>
      <PresidentMessage ref={presidentMessage}/>
    </>
  )
}

export default Home