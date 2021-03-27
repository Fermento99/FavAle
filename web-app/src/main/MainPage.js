import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Logo, Page } from '../common'
import BeerList from './utils/BeerList'
import PageChooser from './utils/page_chooser/PageChooser'

export default function MainPage() {
  const [pageNr, setPageNr] = useState(1)
  const history = useHistory()
  const token = window.sessionStorage.getItem("FA_token")
  let favourites = []
  fetch('http://localhost:3001/favs', {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => res.json())
    .then(data => {
      if (data.data) {
        console.log(data)
        data.data.forEach(beer => favourites.splice(0, 0, beer.beerId))
        console.log(favourites)
        window.sessionStorage.setItem('FA_favourites', JSON.stringify(favourites))
      } else {
        console.log(data)
        alert("You have been logged out")
        history.goBack()
      }
    })
  return (
    <Page>
      <h1>Fav Ale</h1>
      <BeerList curr={pageNr} />
      <PageChooser curr={pageNr} setPage={setPageNr} />
      <Logo />
    </Page>
  )
}
