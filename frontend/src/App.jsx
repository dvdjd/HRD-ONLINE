import AppRoutes from './Routes'
import Navigation from './components/Navigation'
import TopNav from './components/TopNav'
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    if (sessionStorage.getItem('isLogin') === null || sessionStorage.getItem('user') === null) {
      sessionStorage.setItem('isLogin', false)
    }
  }, [])
  return (
    <>
      {/* <Navigation /> */}
      <TopNav />
      <AppRoutes />
    </>
    
  )
}

export default App
