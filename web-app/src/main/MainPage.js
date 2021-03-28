import React, { useState } from 'react'
import { Logo, Page } from '../common'
import BeerList from './utils/BeerList'
import MailButton from './utils/MailButton'
import PageChooser from './utils/page_chooser/PageChooser'
import styled from 'styled-components'

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  min-width: 360px;
`

export default function MainPage() {
  const [pageNr, setPageNr] = useState(1)

  return (
    <Page>
      <Header>
        <MailButton />
        <h1>Fav Ale</h1>
      </Header>
      <BeerList curr={pageNr} />
      <PageChooser curr={pageNr} setPage={setPageNr} />
      <Logo />
    </Page>
  )
}
