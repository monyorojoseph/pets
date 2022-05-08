import React, { useState } from 'react'
import FormContainer from '../containers/FormContainer'
import ButtonLoader from '../components/ButtonLoader'
import { Form, Button } from 'react-bootstrap'
import { send_email } from '../actions/auth'
import { connect } from 'react-redux'

const ResetPassword = ({send_email, auth}) => {
    const [data, setData] = useState({"email": ""})
    const { sending } = auth
    const onChangeHandler = (e)=> {
        e.persist()
        setData({...data, [e.target.name]: e.target.value})
    }
    const onSubmitHandler = (e)=> {
        e.preventDefault()
        send_email(data)
    }
  return (
    <FormContainer>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control value={data.email} onChange={onChangeHandler}
                name="email" size="sm" className="shadow-none" type="email"/>
                <Form.Text>Write email to receive reset password link</Form.Text>
            </Form.Group>
            {sending ? <ButtonLoader variant="primary" /> : <Button className='shadow-none' size="sm" variant="primary" type="submit">Send</Button>}
        </Form>
    </FormContainer>
  )
}
const mapStateToProps = state=> ({
    auth: state.auth
})
const mapDispatchToProps = {
    send_email
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)