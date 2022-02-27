import { MapView } from '../components'
import { BtnMyLocation } from '../components/BtnMyLocation'
import { ReactLogo } from '../components/ReactLogo';

export const Home = () => {
  return (
    <>
      <MapView></MapView>
      <BtnMyLocation></BtnMyLocation>
      <ReactLogo></ReactLogo>
    </>
  )
}
