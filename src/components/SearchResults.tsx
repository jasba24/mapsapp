import { useContext } from 'react'
import { PlacesContext } from '../context'
import { LoadingPlaces } from './'

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)

  if (isLoadingPlaces) <LoadingPlaces />


  if (places.length === 0)  <></>

  return (
    <ul className="list-group mt-e">
      {places.map((places) => (
        <li key={places.id} className="list-group-item list-group-item-action">
          <h6>{places.text_es}</h6>
          <p
            className="text-muted"
            style={{
              fontSize: '12px'
            }}
          >
            {places.place_name}
          </p>
          <button className="btn btn-outline-primary btn-sm">
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  )
}
