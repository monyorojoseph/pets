import React, { useState } from 'react'
import FormContainer from '../containers/FormContainer'
import { Form, Button }  from 'react-bootstrap'
import ButtonLoader from '../components/ButtonLoader'
import { change_password } from '../actions/auth'
import { connect } from 'react-redux'

const ChangePassword = ({ change_password, auth}) => {
    const { changing } = auth
    const [data, setData] = useState({
        'old_password': '',
        'new_password1': '',
        'new_password2': ''
    })
    const onChangeHandler = (e)=> {
        e.persist()
        setData({...data, [e.target.name]:e.target.value})
    }
    const onSubmitHandler = (e)=> {
        e.preventDefault()
        console.log(data)
        change_password(data)
    }
    return (
        <FormContainer>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className='mb-2'>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control required onChange={onChangeHandler} name="old_password" size='sm' className="shadow-none" type="password" />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control required onChange={onChangeHandler} name="new_password1" size='sm' className="shadow-none" type="password" />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control required onChange={onChangeHandler} name="new_password2" size='sm' className="shadow-none" type="password" />
                </Form.Group>
                {changing ? <ButtonLoader variant='primary' /> : <Button size='sm' type="submit" className="shadow-none"  variant="primary">Change</Button>}
            </Form>
        </FormContainer>
    )
}
const mapStateToProps = state=> ({
    auth: state.auth
})
const mapDispatchToProps = { change_password }
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)