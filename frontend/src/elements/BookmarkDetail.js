import React, {useEffect} from 'react'
import { Container, Col, Card, Row, Popover, Button, OverlayTrigger } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { get_bookmark, remove_bookmark } from '../actions/bookmark'
import { connect } from 'react-redux'
import { FaPhoneAlt, FaTrash } from 'react-icons/fa';
import ImageSlide from '../components/ImageSlide';
import ButtonLoader from '../components/ButtonLoader'

const BookmarkDetail = ({bookmark, get_bookmark, remove_bookmark}) => {
    const { id } = useParams()
    let navigate = useNavigate()
    const { loading, bookmarkData: {pet, contact}, images, deleting, deleted } = bookmark
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Owner's phone</Popover.Header>
          <Popover.Body>{contact}</Popover.Body>
        </Popover>
      );
    const onClickDelete = ()=> {
        remove_bookmark(id)
    }
    
    useEffect(()=> {
        if (deleted) {
            navigate("/profile/bookmarked-pets")
        }
        if (!deleted){
            get_bookmark(id)
        }
    }, [deleted])

    return (
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
                                        <span>For {pet.sale_adoption}</span>
                                        <small className="text-muted mx-3">ksh {pet.price}</small>
                                    </h4>
                                                
                                    <p className="card-text fs-5">Breed <span className='fw-normal fs-5 text-muted mx-3'>{pet.breed.breed_name}</span></p>
                                    <p className="card-text fs-5">Gender<span className='fw-normal fs-5 text-muted mx-3'>{pet.gender}</span></p>
                                    <p className="card-text fs-5">In total<span className='fw-normal fs-5 text-muted mx-3'>{pet.total}</span></p>
                                    <p className="card-text fs-5">Age<span className='fw-normal fs-5 text-muted mx-3'>{pet.age}</span></p>
                                    <div className="card-text fs-5 mb-3">
                                        <p className='my-0'>Description</p>
                                        <article className='fw-normal fs-5 text-muted mx-3 border-start border-warning border-3 rounded-start ps-2'>{pet.description}</article>
                                    </div>
                                    <div className='d-flex flex-row align-items-center justify-content-start'>

                                        {deleting ? <ButtonLoader variant="danger" /> : <Button onClick={onClickDelete} size='sm' variant='danger'className='d-flex flex-row align-items-center shadow-none'>
                                            <span className='mx-2'>Delete</span>
                                            <FaTrash className='mx-2'/>
                                        </Button>}

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
        </Container>)
}

const mapStateToProps = state=> ({
    bookmark: state.bookmark
})

const mapDispatchToProps = {get_bookmark, remove_bookmark}
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkDetail)