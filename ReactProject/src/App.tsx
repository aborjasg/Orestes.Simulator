import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Customers from './components/customer'

function App() {  

  return (
    <>
      <div>        
        <img src={reactLogo} className="logo react" alt="React logo" />        
        <h1>Orestes.Simulator</h1>
        <h3>React Project</h3>
      </div>
      <div className="card">        
        <Customers></Customers>
      </div>      
    </>
  )
}

export default App
