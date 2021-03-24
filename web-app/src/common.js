import styled from 'styled-components'

export const Page = styled.div`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LogoImg = styled.img`
  margin: 2em;
`

export function Logo() {
  return(
    // TODO: add logo src
    <LogoImg src="" alt="Logo GrupaVIST" />
  )
}