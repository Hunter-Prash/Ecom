import { Routes,Route, Router } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Policy from './pages/Policy.jsx'
import React from 'react'
import PageNotFound from './pages/PageNotFound.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Header from './components/Header.jsx'
import Signup from './pages/Signup.jsx'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
