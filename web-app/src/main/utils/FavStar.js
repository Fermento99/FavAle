import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Star = styled.svg`
  align-self: flex-end;
  box-sizing: border-box;
  height: 25px;
  width: 25px;
  margin: .7em;
`

const click = (fav, setFav, id, hist) => {
  const storage = window.sessionStorage.getItem("FA_favourites")
  let favourites = JSON.parse(storage)
  const token = window.sessionStorage.getItem("FA_token")
  console.log(token)
  if (fav) {
    favourites.splice(favourites.indexOf(id), 1)
    window.sessionStorage.setItem('FA_favourites', JSON.stringify(favourites))
    fetch('http://localhost:3001/favs', {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'beerId': id })
    }).then(res => res.json())
      .then(data => {
        window.sessionStorage.setItem("FA_token", data.token)
        if (data.status) {
          alert(`Error: ${data.dbresonse.err}`)
        }
        else {
          setFav(false);
        }
      })
  } else {
    favourites.splice(0, 0, id)
    window.sessionStorage.setItem('FA_favourites', JSON.stringify(favourites))
    fetch('http://localhost:3001/favs', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'beerId': id })
    }).then(res => res.json())
      .then(data => {
        window.sessionStorage.setItem("FA_token", data.token)
        if (data.dbresonse) {
          alert(`Error: ${data.dbresonse.err}`)
        }
        else
          setFav(true)
      })
  }
}

export default function FavStar({ beerId }) {
  let storage = window.sessionStorage.getItem('FA_favourites')
  let flag = false

  storage = JSON.parse(storage)
  console.log(storage, beerId,)
  if (storage && storage.indexOf(beerId) > -1)
    flag = true

  const [fav, setFav] = useState(flag)
  const history = useHistory()

  return (
    <Star xmlns="http://www.w3.org/2000/svg" fill={fav ? '#000000' : 'none'} viewBox="0 0 24 24" stroke="currentColor" onClick={() => { click(fav, setFav, beerId, history) }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </Star>
  )
}
