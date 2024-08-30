import { useEffect } from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Galleries from './pages/Galleries'
import LoginPage from './pages/LoginPage'
import RulesReg from './pages/RulesReg'
import PDF from './pages/PDF'
import PDF2 from './pages/PDF2'
import PDF3 from './pages/PDF3'
import MVC from './pages/MVC'
import { useDispatch } from 'react-redux'
import { userActions } from './redux/actions'


const AppRoutes = () => {
    const dispatch = useDispatch()
    const loc = useLocation()

    useEffect(() => {
        !window.sessionStorage.getItem("isLogin") && dispatch(userActions.setUserInfoToNull())
    }, [loc])
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galleries" element={<Galleries />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/rules" element={<RulesReg />} />
            <Route path="/pdf/:cat" element={<PDF />} />
            <Route path="/pdf2/:cat" element={<PDF2 />} />
            <Route path="/pdf3/:cat" element={<PDF3 />} />
        </Routes>
    )
}

export default AppRoutes