import React from 'react'
import CardA from '../components/CardA'
import CardB from '../components/CardB'
import CardC from '../components/CardC'
import style from '../style/style.module.css'
import homeCSS from './Home.module.css'
const Home = () => {
  return (
    <>
      <br /><br /><br /><br />
      <div className={style['flex-container']}>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardA />
          </div>
          <div className={`${style["flex-item"]} ${style["large"]}`}>
              <CardC />
              {/* <CardC /> */}
          </div>
          <div className={`${style["flex-item"]} ${style["small"]}`}>
              <CardB />
          </div>
      </div>
    </>
  )
}

export default Home