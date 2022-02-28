import axios from 'axios'

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoiamFzYmEyNCIsImEiOiJjbDA0bXQwbzQxcGxqM2d0ODlmajJoaGhkIn0.wnS4402iHw-O26h7dn51JA'
  }
})


export default searchApi