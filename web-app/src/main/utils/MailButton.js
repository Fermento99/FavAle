import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  box-sizing: border-box;
  height: 3em;
  width: 10em; 
  border-radius: 5px;
  border: none;
  background-color: #002366;
  color: white;
  margin-bottom:4em;
`

const mailme = hist => {
  const token = window.sessionStorage.getItem("FA_token")
  fetch(`${process.env.REACT_APP_API_HOST}/mail`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if (res.status === 200)
      alert("List of your favourite beers has been mailed to you")
    else
      throw res.status
  }).catch(e => {
    if (e === 401) {
      alert("You have been logged out")
      hist.push('/')
    } else
      alert("something has gone wrong, try again later")
  })
}

export default function MailButton() {
  const history = useHistory
  return (
    <Button onClick={() => { mailme(history) }}>
      Mail me!
    </Button>
  )
}
