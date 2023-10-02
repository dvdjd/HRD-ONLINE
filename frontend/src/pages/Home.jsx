import React, { useEffect } from 'react'
import CardA from '../components/CardA'
import CardB from '../components/CardB'
import CardC from '../components/CardC'
import style from '../style/style.module.css'
import Post from '../components/Post';
import PresidentMessage from '../components/PresidentMessage'
import { useRef } from 'react'
const Home = () => {
  const presidentMessage = useRef()
  useEffect(() => {
    //presidentMessage.current?.handleClick()
  }, [])
  return (
    <>
      <br /><br /><br /><br />
      <div className={style['flex-container']}>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardA />
          </div>
          <div className={`${style["flex-item"]} ${style["large"]}`}>
              {localStorage.getItem('isLogin') === 'true' ? <Post /> : (<></>)}
              <CardC />
              {/* <CardC />
              <CardC /> */}
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