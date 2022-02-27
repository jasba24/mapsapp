import { PlacesProvider } from './context/places'
import { Home } from './screens'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFzYmEyNCIsImEiOiJjbDA0bXQwbzQxcGxqM2d0ODlmajJoaGhkIn0.wnS4402iHw-O26h7dn51JA'

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <Home></Home>
    </PlacesProvider>
  )
}
