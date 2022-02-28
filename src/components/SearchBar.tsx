import { ChangeEvent, useRef, useContext } from 'react'
import { PlacesContext } from '../context'
export const SearchBar = () => {
  const debounceRef = useRef<NodeJs.Timeout>()
  const { searchPlacesByTerm } = useContext(PlacesContext)

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(async () => {
      //todo: ejecuta la busqueda
      await searchPlacesByTerm(event.target.value)
    }, 350)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar Lugar..."
        onChange={onQueryChanged}
      />
    </div>
  )
}
