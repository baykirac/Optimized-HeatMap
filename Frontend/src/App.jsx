import { useState } from 'react'
import MapComponent from './components/MapComponent'
import Navbar from './components/Navbar'
import Context from './context/Context'
import './App.css'

function App() {

  return (
    <>
      <Navbar/>
      <MapComponent/>
    </>
  )
}

export default App
