import React, { useState } from 'react'
import { Logo, Page } from '../common'
import BeerList from './utils/BeerList'
import PageChooser from './utils/page_chooser/PageChooser'

export default function MainPage() {
  const [pageNr, setPageNr] = useState(1)
  return (
    <Page>
      <h1>Fav Ale</h1>
      <BeerList curr={pageNr} />
      <PageChooser curr={pageNr} setPage={setPageNr}/>
      <Logo />
    </Page>
  )
}
