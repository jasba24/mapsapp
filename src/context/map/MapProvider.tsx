import { useReducer, useContext, useEffect } from 'react'
import { LngLatBounds, Map, Marker, Popup } from 'mapbox-gl'

import { MapContext } from './MapContext'
import { MapReducer } from './MapReducer'
import { PlacesContext } from '../'
import directionsApi from '../../apis/directionsApi'
import { DirectionsResponse } from '../../interfaces/directions'

export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMArkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `)

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMArkers.push(newMarker)
    }

    // Todo: limpiar polyline

    dispatch({ type: 'setMarkers', payload: newMArkers })
  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Aquí estoy</h4>
      <p>En algún lugar del mundo</p>
    `)

    new Marker({
      color: '#61DAFB'
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ type: 'setMap', payload: map })
  }

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    )
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry
    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100

    const minutes = Math.floor(duration / 60)
    console.log({ kms, minutes })

    const bounds = new LngLatBounds(start, start)

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, { padding: 200 })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
