import React, { useRef } from 'react'
import styled from 'styled-components'
import LoginInput from './utils/LoginInput'
import LoginButton from './utils/LoginButton'
import RegisterButton from './utils/RegisterButton'

const Page = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  margin: 2em;
`


export default function LoginPage() {
  const user = useRef()
  const pass = useRef()

  const login = (user, pass) => {
    let u = user.current.value
    let p = pass.current.value
    const data = { 'user': u, 'password': p };
    console.log(data);
  }

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

