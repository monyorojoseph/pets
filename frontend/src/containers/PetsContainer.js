import React from 'react'
import { Row } from 'react-bootstrap'
import NoPets from '../components/NoPets'
import PetCard from '../components/PetCard'


const PetsContainer = ({pets}) => {
  return pets.length == 0 ? (<NoPets />) : (
    <Row className="g-4" xs={1} sm={2} md={5} xlg={6}>
        { pets.map((d)=> (<PetCard key={d.id} petData={d} />))}
    </Row>
  )
}

export default PetsContainer