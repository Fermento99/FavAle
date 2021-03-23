import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterButton() {
  return (
    <Link to='/register' style={{textDecoration: 'none', margin: '.5em'}}>Nie masz konta? <b>Zarejestruj się</b></Link>
  )
}
