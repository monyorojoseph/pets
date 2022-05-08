import React, {useEffect} from 'react'
import { Container, Card, Row, Col, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa';
import BookmarkButton from '../components/BookmarkButton';
import ImageSlide from '../components/ImageSlide';
import { pet_details } from '../actions/pet';
import { add_bookmark } from '../actions/bookmark';
import { connect } from 'react-redux'
import PageLoader from '../components/PageLoader';
import ButtonLoader from '../components/ButtonLoader'

const PetDetail = ({pet_details, pet, add_bookmark, bookmark, auth}) => {
    const { pet_name } = useParams()
    let navigate = useNavigate()
    const { loading, images, petData} = pet;
    const { adding } = bookmark;
    const { credentials:{access_token }} = auth
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Owner's phone</Popover.Header>
          <Popover.Body>{petData.contact}</Popover.Body>
        </Popover>
      );
    const clickHandler = ()=> {
        if (access_token) {
            add_bookmark({pet_name})
        } else {
            navigate("/signin")
        }
        
    }
    useEffect(()=> {
        pet_details(pet_name)
    }, [])
  return loading ? (<PageLoader />) : (
    <Container className='my-2'>
        <Row className="justify-content-center">
            <Col md={10} sm={12}>
                <Card>
                    <Row className="align-items-center justify-content-center">
                        <Col md={3} >
                            <ImageSlide images={images} />
                        </Col>
                        <Col md={8} >
                            <Card.Body className='mx-1 px-5'>
                                <h4>
                                    <span>For {petData.sale_adoption}</span>
                                    <small className="text-muted mx-3">ksh {petData.price}</small>
                                </h4>
                                            
                                <p className="card-text fs-5">Breed <span className='fw-normal fs-5 text-muted mx-3'>{petData.breed.breed_name}</span></p>
                                <p className="card-text fs-5">Gender<span className='fw-normal fs-5 text-muted mx-3'>{petData.gender}</span></p>
                                <p className="card-text fs-5">In total<span className='fw-normal fs-5 text-muted mx-3'>{petData.total}</span></p>
                                <p className="card-text fs-5">Age<span className='fw-normal fs-5 text-muted mx-3'>{petData.age}</span></p>
                                <div className="card-text fs-5 mb-3">
                                    <p className='my-0'>Description</p>
                                    <article className='fw-normal fs-5 text-muted mx-3 border-start border-warning border-3 rounded-start ps-2'>{petData.description}</article>
                                </div>
                                <div className='d-flex flex-row align-items-center justify-content-start'>
                                    {adding ? <ButtonLoader variant="success" /> : <BookmarkButton clickHandler={clickHandler} />}
                                    <OverlayTrigger trigger="click" placement="top" overlay={popover}>                                        
                                        <Button size="sm" variant='secondary' className='d-flex flex-row align-items-center ms-2 shadow-none' >
                                            <FaPhoneAlt className='mx-2' />                                        
                                            <span className='mx-2'>Contact</span>
                                        </Button>
                                    </OverlayTrigger>
                                </div>

                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}
const mapStateToProps = state=> ({
    pet: state.pet,
    bookmark: state.bookmark,
    auth: state.auth
})
const mapDispatchToProps = {pet_details, add_bookmark}
export default connect(mapStateToProps, mapDispatchToProps)(PetDetail)