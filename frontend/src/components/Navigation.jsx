import logo from '../style/images/nmcp-logo.png'
import NavigationCSS from './Navigation.module.css'
import {HiUser} from 'react-icons/hi'

const Navigation = () => {
  return (
    <nav className={NavigationCSS.nav}>
        <div className={NavigationCSS['d-flex']}>
            <img src={logo} alt="logo" width="40px" height="40px"/>
            <h3><strong>HRD-Online</strong></h3>
        </div>
        <ul className={NavigationCSS['navbar-items']}>
            <li><a>NMCP Company</a></li>
            <li><a>Recruitment / Training</a></li>
            <li><a>Procedures, Guidelines and Forms</a></li>
            <li><a>Environmental</a></li>
            <li><a>Activity / Programs</a></li>
            <li><a>Galleries</a></li>
        </ul>
        <ul className={NavigationCSS['navbar-items']}>
            <li className={NavigationCSS['login']}><a className={`${NavigationCSS['d-flex']} ${NavigationCSS['align-center']}`}>
                <div className={NavigationCSS["icon"]}>  
                    <HiUser color='#0454d9' size={20} className={NavigationCSS['mr-10']} style={{margin: '0'}}/>
                </div>
                Login
            </a></li>
        </ul>
    </nav>
  )
}

export default Navigation