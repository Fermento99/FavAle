import React from 'react'
import styled from 'styled-components'

const Label = styled.h3`
  margin: .3em 1em;
  width: min-content;
`

const LogInput = styled.input`
  box-sizing: border-box;
  padding: .8em 1em;
  width: 100%;
  border-radius: 5px;
  border: solid #002366 1px;
  box-shadow: 3px 3px #002366;
`

const InputBox = styled.div`
  width: 40%;
  min-width: 330px;
`

export default function input({ type, label, childref }) {
  return (
    <InputBox>
      <Label>{label}</Label>
      <LogInput type={type} ref={childref} />
    </InputBox>
  )
}
