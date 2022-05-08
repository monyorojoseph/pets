import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {cat_dog_choice} from '../../utils'
import ButtonLoader from '../../components/ButtonLoader'
import { add_breed } from '../../actions/breed'
import { connect } from 'react-redux'

const AddBreed = ({add_breed, breed}) => {
    let navigate = useNavigate()
    const { adding, added} = breed
    const [formData, setFormData] = useState({
        "breed_name": "",
        "cat_dog": ""
    })
    const onChangeHandler = (e)=> {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e)=> {
        e.preventDefault()
        add_breed(formData)
    }

    useEffect(()=> {
        if (added) {
            navigate("/breed")
        }
    }, [added])

  return (
    <Container>
        <Form onSubmit={onSubmitHandler}>          
            <Row className="align-items-end g-3">
                <Form.Group as={Col} md={5}>
                    <Form.Label>Breed Name</Form.Label>
                    <Form.Control required className="shadow-none" size='sm' value={formData.breed_name} onChange={onChangeHandler} name="breed_name" placeholder='type breed name' />
                </Form.Group>

                <Form.Group as={Col} md={5}>
                <Form.Label>Cat/Dog</Form.Label>
                <Form.Select required onChange={onChangeHandler} name="cat_dog" size='sm' className="shadow-none">
                    <option >--------------</option>
                    {cat_dog_choice.map((b, index)=> (<option value={b} key={index} >{b}</option>))}
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md={2}>
                    {adding ? <ButtonLoader variant="primary" /> :<Button size="sm" variant="primary" className="shadow-none" type="submit">Add</Button>}
                </Form.Group>
            </Row>
        </Form>
    </Container>
  )
}

const mapStateToProps = state=> ({
    breed: state.breed
})

const mapDispatchToProps = { add_breed }

export default connect(mapStateToProps, mapDispatchToProps)(AddBreed)