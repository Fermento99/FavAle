import React, { useState } from 'react'
import Beer from './Beer';
import styled from 'styled-components'

const BeersConteiner = styled.div`
  box-sizing: border-box;
  width: 75%;
  min-width:375px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export default function BeerList({ curr }) {
  const [state, setState] = useState({ 'curr': -1, 'beers': [] })

  if (state.curr !== curr) {
    console.log('fetching PUNKAPI')
    fetch(`https://api.punkapi.com/v2/beers?page=${curr}&per_page=5`)
      .then(res => res.json())
      .then(data => setState({ 'curr': curr, 'beers': data }));
    return (
      // TODO: change to spinners 
      <div>
        <p>piwo się ładuje</p>
        <p>piwo się ładuje</p>
        <p>piwo się ładuje</p>
        <p>piwo się ładuje</p>
        <p>piwo się ładuje</p>
      </div>
    )
  } else {
    return (
      <BeersConteiner>
        {state.beers.map(beer => <Beer key={beer.id} obj={beer} />)}
      </BeersConteiner>
    )
  }


}
