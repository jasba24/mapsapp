import { useContext, useState } from 'react'
import { PlacesContext, MapContext } from '../context'
import { LoadingPlaces } from './'
import { Feature } from '../interfaces/places'

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints } = useContext(MapContext)

  const [activeId, setActiveId] = useState('')

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center
    setActiveId(place.id)
    map?.flyTo({
      zoom: 16,
      center: [lng, lat]
    })
  }

  const getRouter = (place: Feature) => {
    if (!userLocation) return
    const [lng, lat] = userLocation

    getRouteBetweenPoints(userLocation, [lng, lat])
  }

  if (isLoadingPlaces) <LoadingPlaces />

  if (places.length === 0) <></>

  return (
    <ul className="list-group mt-e">
      {places.map(place => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${
            activeId === place.id ? 'active' : ''
          }`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p
            style={{
              fontSize: '12px'
            }}
          >
            {place.place_name}
          </p>
          <button
            onClick={() => getRouter(place)}
            className={`btn btn-sm ${
              activeId === place.id
                ? 'btn-outline-light'
                : 'btn-outline-primary'
            }`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  )
}
