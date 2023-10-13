import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Routes'
import Navigation from './components/Navigation'
import TopNav from './components/TopNav'
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    if (localStorage.getItem('isLogin') === null || localStorage.getItem('user') === null) {
      localStorage.setItem('isLogin', false)
    }
  }, [])
  return (
    <>
      {/* <Navigation /> */}
      <TopNav />
      <Router>
        <AppRoutes />
      </Router>
    </>
    
  )
}

export default App
