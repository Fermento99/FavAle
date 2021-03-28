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
  border: solid #002366 1px;

  

  :valid {
    box-shadow: 3px 3px lightgreen;
  }
  :invalid {
    box-shadow: 3px 3px red;
  }
  :placeholder-shown {
    box-shadow: 3px 3px #002366;
  }
  
`

const InputBox = styled.div`
  width: 40%;
  min-width: 330px;
`

export default function input({ type, label, childref }) {
  return (
    <InputBox>
      <Label>{label}</Label>
      <Input 
        required={true} 
        type={type} 
        minLength={type === 'password' ? 8 : 3} 
        maxLength={type === 'email' ? 40 : type === 'password' ? null : 25}
        placeholder={type === 'password' ? 'password123' : (type==='email' ? 'JonDoe@example.com' : 'John Doe')}
        ref={childref} />
    </InputBox>
  )
}
