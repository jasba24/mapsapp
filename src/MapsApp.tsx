import { PlacesProvider } from './context/places'
import { Home } from './screens';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <Home></Home>
    </PlacesProvider>
  )
}
