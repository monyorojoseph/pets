import React, { useEffect} from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { all_breeds } from '../../actions/breed'
import PageLoader from '../../components/PageLoader'

const AllBreeds = ({ all_breeds, breed }) => {
    const { breeds, loading } = breed
    useEffect(()=> {
        all_breeds()
    }, [])
  return loading ? (<PageLoader />) : (
    <Container>
        <Row>
            <Col>
                <h5>Dogs</h5>
                <ListGroup>
                    {breeds.filter((breed)=> breed.cat_dog === "Dog").map((breed)=> (
                        <ListGroup.Item key={breed.id}>{breed.breed_name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col>
                <h5>Cats</h5>
                <ListGroup>
                    {breeds.filter((breed)=> breed.cat_dog === "Cat").map((breed)=> (
                        <ListGroup.Item key={breed.id}>{breed.breed_name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    </Container>
  )
}

const mapStateToProps = state=> ({
    breed: state.breed
})
const mapDispatchToProps = {all_breeds}

export default connect(mapStateToProps, mapDispatchToProps)(AllBreeds)