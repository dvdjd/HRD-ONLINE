import CelebrantsCSS from './Celebrants.module.css'
import Me from '../style/images/me.png'
const Celebrants = ({name, birthday}) => {
  return (
    <div className={CelebrantsCSS.celebs}>
        <div className={CelebrantsCSS['d-flex']}>
            <img src={Me} alt="" width="40px" height="30px" className={CelebrantsCSS['img-round']}/>
            <p className={CelebrantsCSS['ml-10']}>{name}</p>
        </div>
        <p>{birthday}</p>
    </div>
  )
}

export default Celebrants