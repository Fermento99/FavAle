import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import LoginInput from './utils/LoginInput'
import LoginButton from './utils/LoginButton'
import RegisterButton from './utils/RegisterButton'
import { Logo, Page } from '../common'


const login = (user, pass, hist) => {
  const u = user.current.value
  const p = pass.current.value
  pass.current.value = ''
  user.current.value = ''
  const data = { 'email': u, 'password': p };
  console.log(data);
  fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
      if (data.status) {
        console.log(data)
        const token = data.token
        window.sessionStorage.setItem("FA_token", token)
        let favourites = []
        console.log(`${process.env.REACT_APP_API_HOST}/favs`)
        fetch(`${process.env.REACT_APP_API_HOST}/favs`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).then(res => res.json())
          .then(data => {
            if (data.data) {
              console.log(data)
              data.data.forEach(beer => favourites.splice(0, 0, beer.beerId))
              console.log(favourites)
              window.sessionStorage.setItem('FA_favourites', JSON.stringify(favourites))
            }
          }).then(() => hist.push('/main'))
        
      }
      else
        alert(`You couldn't login. Error message: ${data.err}`)
    })
}

export default function LoginPage() {
  const user = useRef()
  const pass = useRef()
  const history = useHistory()

  return (
    <Page>
      <h1>ZALOGUJ SIĘ</h1>
      <LoginInput type="email" label="E-mail" childref={user} />
      <LoginInput type="password" label="Hasło" childref={pass} />
      <LoginButton text="ZALOGUJ SIĘ" onClick={() => { login(user, pass, history) }} />
      <RegisterButton />
      <Logo />
    </Page>
  )
}

