import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Galleries from './pages/Galleries'
import LoginPage from './pages/LoginPage'
import RulesReg from './pages/RulesReg'
import PDF from './pages/PDF'

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galleries" element={<Galleries />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/rules" element={<RulesReg />} />
            <Route path="/pdf" element={<PDF />} />
        </Routes>
    )
}

export default AppRoutes