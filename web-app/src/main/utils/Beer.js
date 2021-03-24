import React from 'react'
import styled from 'styled-components'
import FavStar from './FavStar'
import Ingredients from './Ingredients'

const Image = styled.img`
  max-width: 80%;
  max-height: 20em;
  margin:1em;
`

const BeerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: auto;
  border: solid black 2px;
  border-radius: 5px;
  margin: 1.5%;
  padding: .6em;
`

const Name = styled.h3`
  margin-top: 0;
`

const Description = styled.p`
  text-align: center;
`

export default function Beer({ obj }) {
  return (
    <BeerContainer>
      <FavStar beerId={obj.id} />
      <Name>{obj.name}</Name>
      <Description>{obj.description}</Description>
      <Ingredients data={obj.ingredients} />
      <Image src={obj.image_url} alt="photo of the beer" />
    </BeerContainer>
  )
}
