import React from 'react'
import styled from 'styled-components'

const Label = styled.h3`
  margin: .3em 1em;
  width: min-content;
`

const Input = styled.input`
  box-sizing: border-box;
  padding: .8em 1em;
  width: 100%;
  border-radius: 5px;
  border: solid black 1px;
`

const InputBox = styled.div`
  width: 40%;
`

export default function input({ type, label, childref }) {
  return (
    <InputBox>
      <Label>{label}</Label>
      <Input type={type} ref={childref} />
    </InputBox>
  )
}
