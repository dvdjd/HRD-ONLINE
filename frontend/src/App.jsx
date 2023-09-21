import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Routes'
import { useState } from 'react'
import Navigation from './components/Navigation'
import TopNav from './components/TopNav'


function App() {
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
