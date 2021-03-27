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
  fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
      if (data.status) {
        console.log(data)
        hist.push({pathname: '/main', state: {token: data.token}})
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
      <LoginInput type="text" label="Login" childref={user} />
      <LoginInput type="password" label="Hasło" childref={pass} />
      <LoginButton text="ZALOGUJ SIĘ" onClick={() => { login(user, pass, history) }} />
      <RegisterButton />
      <Logo />
    </Page>
  )
}

