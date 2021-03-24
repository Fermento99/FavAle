import React, { useRef } from 'react'
import { Page, Logo } from '../common'
import RegisterInput from './utils/RegisterInput'
import LoginButton from './utils/LoginButton'


const register = (user, mail, pass) => {
  const u = user.current.value
  const m = mail.current.value
  const p = pass.current.value
  const data = {'user': u, 'email': m, 'password':p}
  if (!(pass.current.checkValidity() && mail.current.checkValidity() && user.current.checkValidity()))
    return;
  console.log(data)
}

export default function RegisterPage() {
  const user = useRef()
  const mail = useRef()
  const pass = useRef()

  return (
    <Page>
      <h1>ZALOGUJ SIĘ</h1>
      <RegisterInput type="text" label="Login" childref={user} />
      <RegisterInput type="email" label="E-mail" childref={mail} />
      <RegisterInput type="password" label="Hasło" childref={pass} />
      <LoginButton text="ZAREJESTRUJ SIĘ" onClick={() => {register(user, mail, pass) }} />
      <Logo src="" alt="Logo GrupaVIST" />
    </Page>
  )
}
