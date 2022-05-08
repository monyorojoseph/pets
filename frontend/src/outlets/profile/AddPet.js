import React, { useState, useEffect } from 'react'
import { Row, Form, Col, Button} from 'react-bootstrap'
import { sex_choices, sale_adopt } from '../../utils'
import ButtonLoader from '../../components/ButtonLoader'
import { add_pet } from '../../actions/pet'
import { all_breeds } from '../../actions/breed'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const AddPet = ({all_breeds, add_pet, breed, pet}) => {
  let navigate = useNavigate()
  const { breeds } = breed
  const { adding, added } = pet
  const [petData, setPetData] = useState({
    "breed": "",
    "gender": "",
    "sale_adoption": "",
    "age": "",
    "price": '',
    "total": '',
    "description": ""
  })

  const onChangeHandler = (e)=> {
    e.persist();
    setPetData({...petData, [e.target.name]:e.target.value})
  }
  const onSubmitHandler = (e)=> {
    e.preventDefault();
    let data = new FormData(document.querySelector("#form"))
    add_pet(data)
  }

  useEffect(() => {
    all_breeds();
    if (added) {
      navigate("/profile/user-pets")
    }
  }, [added])
  
  return (
      <Form onSubmit={onSubmitHandler} id="form">
            <Form.Group className="mb-2">
              <Form.Label>Choose image (s)</Form.Label>
              <Form.Control className='shadow-none' multiple={true} name="images" size='sm' type="file" />
            </Form.Group>

          <Row className="mb-2">
            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Breed</Form.Label>
                <Form.Select className='shadow-none' defaultValue={petData.breed} onChange={onChangeHandler} name="breed" size='sm'>
                  <option >--------------</option>
                  {breeds.map((b)=> (<option value={b.breed_name} key={b.id} >{b.breed_name}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Gender</Form.Label>
                <Form.Select className='shadow-none' defaultValue={petData.gender} onChange={onChangeHandler} name="gender" size='sm'>
                  <option >--------------</option>
                  {sex_choices.map((b, index)=> (<option value={b} key={index} >{b}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Sale / Adoption</Form.Label>
                <Form.Select className='shadow-none' defaultValue={petData.sale_adoption} onChange={onChangeHandler} name="sale_adoption" size='sm'>
                  <option >--------------</option>
                  {sale_adopt.map((b, index)=> (<option value={b} key={index} >{b}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">

            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Age</Form.Label>
                <Form.Control className='shadow-none'value={petData.age} onChange={onChangeHandler} name="age" size='sm' type="text" placeholder="how old is your peet"/>
              </Form.Group>
            </Col>
            
            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Price</Form.Label>
                <Form.Control className='shadow-none'value={petData.price} onChange={onChangeHandler} name='price' size='sm' type="text" placeholder="price" />
              </Form.Group>
            </Col>

            <Col sm={12} md={4}>
              <Form.Group >
                <Form.Label>Total</Form.Label>
                <Form.Control className='shadow-none'value={petData.total} onChange={onChangeHandler} name="total" size='sm' type="text" placeholder="how many are they" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control className='shadow-none'value={petData.description} onChange={onChangeHandler} name='description' as="textarea" rows={4} />
          </Form.Group>

          {adding ? <ButtonLoader variant='secondary' /> : <Button variant="secondary" size="sm" type="submit">Add</Button>}
      </Form>
  )
}
const mapStateToProps = state=> ({
  breed: state.breed,
  pet: state.pet
})

const mapDispatchToProps = {all_breeds, add_pet}

export default connect(mapStateToProps,  mapDispatchToProps)(AddPet)