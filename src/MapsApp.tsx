import { PlacesProvider } from './context'
import { Home } from './screens'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import { MapProvider } from './context/map/MapProvider'

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFzYmEyNCIsImEiOiJjbDA0bXQwbzQxcGxqM2d0ODlmajJoaGhkIn0.wnS4402iHw-O26h7dn51JA'

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <Home></Home>
      </MapProvider>
    </PlacesProvider>
  )
}
