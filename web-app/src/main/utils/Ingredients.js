import React from 'react'
import styled from 'styled-components'

const IngredientList = styled.div`
  align-self:flex-start;
`

const List = styled.p`
  margin: .7em;
`

const Title = styled.h5`
  margin-bottom: -.2em;
`

const unique = arr => {
  let names = arr.map(e => e.name)
  let uniq = new Set(names)
  uniq = [...uniq]
  return uniq.join(', ')
}

export default function Ingredients({ data }) {
  const hops = unique(data.hops)
  const malt = unique(data.malt)
  return (
    <IngredientList>
      <h4>Ingridients list:</h4>
      <Title>Hops:</Title>
      <List>{hops}</List>
      <Title>Malt:</Title>
      <List>{malt}</List>
      <Title>Yeast:</Title>
      <List>{data.yeast}</List>
    </IngredientList>
  )
}
