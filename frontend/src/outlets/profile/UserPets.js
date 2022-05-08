import React, {useEffect} from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import PageLoader from '../../components/PageLoader'
import { user_pets } from '../../actions/pet'
import { connect } from 'react-redux'


const UserPets = ({user_pets, pet}) => {
  const { pets, loading} = pet

  useEffect(() => {
    user_pets()
  }, [])
  
  return loading ? (<PageLoader />) : (
    <Container>
      <Row className='my-3 px-1' xs={1} sm={2} md={4} lg={5}>
        {pets.length === 0 ? <p className='text-center w-100 fs-5 text-muted fw-bold'>You haven't added any pet, <Link to="/profile/add-pet">add pet</Link></p> :
        pets.map((pet)=> (
                <Col key={pet.id}>
                  <Card className='p-0'>
                      <img variant="top" src={pet.cover_image} alt={pet.pet_name} className="m-0" />
                      <Card.Body>
                          <div className="d-flex flex-row align-items-center justify-content-between">
                              <span className='fw-bold'>For {pet.sale_adoption}</span>
                              <span>{pet.price}</span>
                          </div>
      
                          <div className="text-center mt-2">
                              <Button as={Link} variant="primary" size='sm' className='shadow-none' to={`/edit-pet/${pet.pet_name}`}>change details</Button>
                          </div>          
                      </Card.Body>
                  </Card>
              </Col>
        ))}
      </Row>
    </Container>
  )
}

const mapStateToProps = state=> ({
  pet: state.pet
})

const mapDispatchToProps = { user_pets }

export default connect(mapStateToProps, mapDispatchToProps)(UserPets)