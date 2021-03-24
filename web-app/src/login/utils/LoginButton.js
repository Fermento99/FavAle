import React from 'react'
import styled from 'styled-components'

const UniButton = styled.button`
  width: 40%;
  min-width: 330px;
  margin: 1em;
  height: 2.8em;
  color: white;
  background-color: black;
  border: solid black 1px;
  border-radius: 5px;
`

export default function LoginButton({ text, onClick }) {
  return (
    <UniButton onClick={onClick}>{text}</UniButton>
  )
}
