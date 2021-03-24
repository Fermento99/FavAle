import React, { useRef } from 'react'
import LoginInput from './utils/LoginInput'
import LoginButton from './utils/LoginButton'
import RegisterButton from './utils/RegisterButton'
import {Logo, Page} from '../common'


const login = (user, pass) => {
  const u = user.current.value
  const p = pass.current.value
  const data = { 'user': u, 'password': p };
  console.log(data);
}

export default function LoginPage() {
  const user = useRef()
  const pass = useRef()

  return (
    <Page>
      <h1>ZALOGUJ SIĘ</h1>
      <LoginInput type="text" label="Login" childref={user} />
      <LoginInput type="password" label="Hasło" childref={pass} />
      <LoginButton text="ZALOGUJ SIĘ" onClick={() => login(user, pass)} />
      <RegisterButton />
      <Logo src="" alt="Logo GrupaVIST" />
    </Page>
  )
}

