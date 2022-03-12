import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoiamFzYmEyNCIsImEiOiJjbDA0bXQwbzQxcGxqM2d0ODlmajJoaGhkIn0.wnS4402iHw-O26h7dn51JA'
  }
})

export default directionsApi
