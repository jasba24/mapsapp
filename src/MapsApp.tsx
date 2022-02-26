import React from 'react'
import { PlacesProvider } from './context/places/PlacesProvider';

export const MapsApp = () => {
  return <PlacesProvider>
    <h1>Hello world again</h1>
  </PlacesProvider>
}
