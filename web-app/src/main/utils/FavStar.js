import React, { useState } from 'react'
import styled from 'styled-components'

const Star = styled.svg`
  align-self: flex-end;
  box-sizing: border-box;
  height: 25px;
  width: 25px;
  margin: .7em;
`

const click = (fav, setFav, id) => {
  const storage = window.sessionStorage.getItem("favourites")
  let favourites = JSON.parse(storage)
  if (fav) {
    setFav(false)
    favourites.splice(favourites.indexOf(id), 1)
    window.sessionStorage.setItem('favourites', JSON.stringify(favourites))
  } else {
    setFav(true)
    favourites.splice(0, 0, id)
    window.sessionStorage.setItem('favourites', JSON.stringify(favourites))
  }
  console.log(favourites)
}

export default function FavStar({ beerId }) {
  const [fav, setFav] = useState(false)

  let storage = window.sessionStorage.getItem('favourites')
  storage = JSON.parse(storage)
  if (storage && beerId in storage)
    setFav(true)

  return (
    <Star xmlns="http://www.w3.org/2000/svg" fill={fav ? '#000000' : 'none'} viewBox="0 0 24 24" stroke="currentColor" onClick={() => { click(fav, setFav, beerId) }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </Star>
  )
}
