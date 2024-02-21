import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/Auth'
import { RecoilRoot } from 'recoil'
import { Navbar } from './components/NavBar'
import { CreateChannel } from './pages/CreateChannel'
import { LandingPage } from './pages/Landing'
import { useEffect, useState } from 'react'
import { Product } from './pages/Product'

  function App() {
    
    const [cookie,setCookie] = useState(true);
    useEffect(()=>{
      if(document.cookie){
        setCookie(true);
      }
      else{
        setCookie(false);
      }
    },[document.cookie]);

    return(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            
            <Route path='/auth' element={<AuthPage />}/>
            <Route path='/shop' element={<Product />}/>
            {cookie ? 
            <Route path='/' element={<LandingPage />} /> : <Route path='/' element={<Navigate to='/auth' />} /> }
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    )
  }

export default App

{/* <AuthPage />
      <LandingPage /> */}