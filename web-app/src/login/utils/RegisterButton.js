import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled(Link)`
  text-decoration: none;
  margin: .5em;
`

export default function RegisterButton() {
  return (
    <Button to='/register'>Nie masz konta? <b>Zarejestruj się</b></Button>
  )
}
