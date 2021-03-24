import React from 'react'
import styled from 'styled-components'

export const NormalButton = styled.button`
  background-color: transparent;
  border: none;
  margin: .5em;
`

const CurrentButton = styled.button`
  background-color: transparent;
  border: none;
  margin: .5em;
  font-weight: bold;
`


export default function NumberButton({ curr, page, onclick }) {
  if (curr)
    return (
      <CurrentButton onClick={onclick}>
        {page}
      </CurrentButton>
    )
  else
    return (
      <NormalButton onClick={onclick}>
        {page}
      </NormalButton>
    )
}
