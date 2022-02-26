import { useContext } from 'react'
import { MapView } from '../components'
import { PlacesContext } from '../context/places';
import { Loading } from '../components/Loading';

export const Home = () => {

  const {isLoading, userLocation} = useContext(PlacesContext)

  if (isLoading) {
    return (<Loading></Loading>)
  }

  return (
    <div>
      {userLocation?.join(', ')}
    </div>
  )
}
