import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PetCard = ({petData}) => {
  return (
        <Col>
            <Card  className="p-0" >                    
                <Card.Img variant="top" src={petData.cover_image} className="m-0" />
                <Card.Body>

                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className='fw-bold'>For {petData.sale_adoption}</span>
                        <span>{petData.price}</span>
                    </div>

                    <div className="d-flex fs-6 flex-row align-items-center justify-content-between">
                        <small>{petData.breed.breed_name}</small>
                    </div>

                    <p className='my-1'><small>{petData.age} old</small></p>

                    <div className="text-center">
                        <Button className="shadow-none" as={Link} size='sm' to={`/pet/${petData.pet_name}`} variant="primary">see more details</Button>
                    </div>     
                </Card.Body>
            </Card>
        </Col>
        
  )
}
export default PetCard