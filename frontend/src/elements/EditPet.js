import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card, Collapse } from 'react-bootstrap'
import { sex_choices, sale_adopt } from '../utils'
import { connect } from 'react-redux'
import { pet_details, remove_pet, update_pet, add_pet_image, remove_pet_image } from '../actions/pet'
import { all_breeds } from '../actions/breed'
import { FaTrash} from 'react-icons/fa'
import ButtonLoader from '../components/ButtonLoader'
import PageLoader from '../components/PageLoader'
import { AiOutlineClose  } from 'react-icons/ai'



const EditPet = ({pet, pet_details, all_breeds, remove_pet, breed, update_pet, add_pet_image, remove_pet_image}) => {
  const { pet_name } = useParams()
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const { petData, loading, images, deleting, deleted, updating, updated, adding, added, deletedImage } = pet
  const { breeds } = breed
  const [ data, setData ] = useState({
    'breed': '',
    'gender': '',
    'sale_adoption': '',
    'age': '',
    'price': '',
    'total': '',
    'description': ''
  })

  const handleOpen = ()=> {
    setOpen(!open) 
    setData({
      'breed': petData.breed.breed_name,
      'gender': petData.gender,
      'sale_adoption': petData.sale_adoption,
      'age': petData.age,
      'price': petData.price,
      'total': petData.total,
      'description': petData.description
    })

  }
  const onChangeHandler = (e)=> {
    setData({...data, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e)=> {
    e.preventDefault()
    update_pet(data ,pet_name)
  }

  const onImageSubmitHandler = (e)=> {
    e.preventDefault()
    const data = new FormData(document.querySelector("#images-form"))
    data.append("pet_name", pet_name)
    add_pet_image(data)
  }

  const onClickDelete = ()=> {
    remove_pet(pet_name)
  }

  const onClickRemoveHandler = (e)=> {
    const img_id = e.target.nextSibling.getAttribute("alt")
    remove_pet_image(img_id)
  }

  useEffect(()=> {
    if (deleted) {
      navigate("/profile/user-pets")
    }
    if (updated) {
      setOpen(false)
    }
    if (!deleted) {
      pet_details(pet_name)
      all_breeds()
    }
  }, [deleted, updated, added, deletedImage])
  return loading ? (<PageLoader />) : (
    <Container className='my-2'>
      <Row className="g-4">
        <Col md={8} sm={12}>
          <Card>
            <Card.Body>
              <Row className='mb-2'>
                <Col>
                  <h6>Breed</h6>
                  <p>{petData.breed.breed_name}</p>
                </Col>
                <Col>
                  <h6>Gender</h6>
                  <p>{petData.gender}</p>
                </Col>
                <Col>                
                  <h6>Sale / Adoption</h6>
                  <p>{petData.gender}</p>
                </Col>                
                <Col>                
                  <h6>Age</h6>
                  <p>{petData.age}</p>
                </Col>                
                <Col>                
                  <h6>Price</h6>
                  <p>{petData.price}</p>
                </Col>
                <Col>                
                  <h6>Total</h6>
                  <p>{petData.total}</p>
                </Col>
              </Row>
              <div className='mb-3'>
                <h6>Description</h6>
                <article className='p-2 border-start border-3'>{petData.description}</article>
              </div>
              
              <div className="d-flex flex-row justify-content-start align-items-center">
                  <Button onClick={handleOpen} aria-controls="change-pet"
                  aria-expanded={open} size="sm" variant="secondary"  className='shadow-none me-3'>Change</Button>
                      
                  {deleting ? <ButtonLoader variant='danger'/> : <Button onClick={onClickDelete} size='sm' variant='danger'className='d-flex flex-row align-items-center shadow-none'>
                      <span className='mx-2'>Delete</span>
                      <FaTrash className='mx-2'/>
                  </Button>}
              </div>               
              <Collapse in={open} className="mt-3">
                <div id="change-pet">
                  <Form onSubmit={onSubmitHandler}>
                    <Row className="mb-2">
                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Breed</Form.Label>
                          <Form.Select className="shadow-none" defaultValue={data.breed} onChange={onChangeHandler} name="breed" size='sm'>
                            {breeds.map((b)=> (<option value={b.breed_name} key={b.id} >{b.breed_name}</option>))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Gender</Form.Label>
                          <Form.Select className="shadow-none" defaultValue={data.gender} onChange={onChangeHandler} name="gender" size='sm'>
                            {sex_choices.map((b, index)=> (<option value={b} key={index} >{b}</option>))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Sale / Adoption</Form.Label>
                          <Form.Select className="shadow-none" defaultValue={data.sale_adoption} onChange={onChangeHandler} name="sale_adoption" size='sm'>
                            {sale_adopt.map((b, index)=> (<option value={b} key={index} >{b}</option>))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-2">

                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Age</Form.Label>
                          <Form.Control className="shadow-none" value={data.age} onChange={onChangeHandler} name="age" size='sm' type="text" placeholder="how old is your peet"/>
                        </Form.Group>
                      </Col>
                      
                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Price</Form.Label>
                          <Form.Control className="shadow-none" value={data.price} onChange={onChangeHandler} name='price' size='sm' type="number" placeholder="price" />
                        </Form.Group>
                      </Col>

                      <Col sm={12} md={4}>
                        <Form.Group>
                          <Form.Label>Total</Form.Label>
                          <Form.Control className="shadow-none" value={data.total} onChange={onChangeHandler} name="total" size='sm' type="number" placeholder="how many are they" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-2">
                      <Form.Label>Description</Form.Label>
                      <Form.Control className="shadow-none" value={data.description} onChange={onChangeHandler} name='description' as="textarea" rows={4} />
                    </Form.Group>
                      {updating ? <ButtonLoader variant="primary" /> : <Button className="shadow-none" variant="primary" size="sm" type="submit">Save</Button> }
                  </Form>
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Row lg={4} md={3} sm={2} xs={1} className="mb-3 g-2">
            {images.map((img)=> ( 
              <Col key={img.id}className='position-relative'>
                <AiOutlineClose onClick={onClickRemoveHandler}
                className="position-absolute top-0 end-0 bg-danger text-light p-1 fw-bold rounded-circle fs-5"/>
                <img
                className="d-block w-100 rounded-3"
                src={img.pet_image}
                alt={img.id}
                />
              </Col>              
            ))}
          </Row>
          <Form onSubmit={onImageSubmitHandler} id="images-form">
            <Row className='align-items-end'>
              <Col md={10}>
                <Form.Group>
                  <Form.Label>Choose image (s)</Form.Label>
                  <Form.Control className='shadow-none' multiple={true} name="images" size='sm' type="file" />
                </Form.Group>
              </Col>              
              <Col md={1}>
                {adding ? <ButtonLoader variant="primary" /> : <Button className='shadow-none' variant="primary" size="sm" type="submit">Add</Button>}
              </Col>              
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  pet: state.pet,
  breed: state.breed
})
const mapDispatchToProps = { pet_details, all_breeds, remove_pet, update_pet, add_pet_image, remove_pet_image }

export default connect(mapStateToProps, mapDispatchToProps)(EditPet)