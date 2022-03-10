import { useEffect, useReducer } from 'react'
import { PlacesContext } from './PlacesContext'
import { PlacesReducer } from './PlacesReducer'
import { getUserLocation } from '../../helpers'
import { searchApi } from '../../apis'
import { PlacesResponse, Feature } from '../../interfaces/places'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  isLoadingPlaces: boolean
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: 'setUserLocation', payload: coords })
    )
  }, [])

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })
      return []
    }
    if (!state.userLocation) throw new Error('no hay ubicacion del usuario')

    dispatch({ type: 'setLoadingPlaces' })

    const res = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })

    dispatch({ type: 'setPlaces', payload: res.data.features })

    return res.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
