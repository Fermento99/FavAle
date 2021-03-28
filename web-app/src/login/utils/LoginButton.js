import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const Button = styled.button`
  width: 40%;
  min-width: 330px;
  margin: 1em;
  height: 2.8em;
  color: white;
  background-color: #002366;
  border: solid #002366 1px;
  border-radius: 5px;
`

export default withRouter(function LoginButton({ text, onClick }) {
  return (
    <Button onClick={onClick}>{text}</Button>
  )
})
