import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MapsApp } from './MapsApp'

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la geolocalización')
  throw new Error('Browser does not support geolocation')
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
)
