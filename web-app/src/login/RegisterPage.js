import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Page, Logo } from '../common'
import RegisterInput from './utils/RegisterInput'
import LoginButton from './utils/LoginButton'


const register = (user, mail, pass, hist) => {
  const u = user.current.value
  const m = mail.current.value
  const p = pass.current.value
  const data = { 'username': u, 'email': m, 'password': p }
  if (!(pass.current.checkValidity() && mail.current.checkValidity() && user.current.checkValidity()))
    return alert("Some data did not validate, try changing some inputs")
  
  fetch(`${process.env.REACT_APP_API_HOST}/auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status === 200){
      alert("You have registered successfully")
      return false;
    }
    else 
      return res.json() 
  }).then(data => {
    if (data)
      alert(`Error: ${data.msg}. Please, try again later`)
    hist.push('/')
  })
}

export default function RegisterPage() {
  const user = useRef()
  const mail = useRef()
  const pass = useRef()
  const history = useHistory()

  return (
    <Page>
      <h1>ZALOGUJ SIĘ</h1>
      <RegisterInput type="text" label="Login" childref={user} />
      <RegisterInput type="email" label="E-mail" childref={mail} />
      <RegisterInput type="password" label="Hasło" childref={pass} />
      <LoginButton text="ZAREJESTRUJ SIĘ" onClick={() => { register(user, mail, pass, history) }} />
      <Logo />
    </Page>
  )
}
