import React, {useState, useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import FormContainer from '../containers/FormContainer';
import { Link, useNavigate } from 'react-router-dom'
import ButtonLoader from '../components/ButtonLoader'
import { signup } from '../actions/auth';
import { connect } from 'react-redux'

const Signup = ({auth, signup}) => {
    let navigate = useNavigate()
    const { registered, registering, credentials:{ access_token } } = auth
    const [formData, setFormData] = useState({
        "username": "",
        "email": "",
        "password1": ""
    })
    const onChangeHandler = (e)=> {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e)=> {
        e.preventDefault();
        signup({...formData, password2:formData.password1})
    }
    useEffect(()=> {
        if (registered || access_token) {
            navigate("/signin")
        }
    },[registered])
    return (
        <FormContainer>
            <Form onSubmit={onSubmitHandler} className='mb-3'>            
                <Form.Group className="mb-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required className="shadow-none" 
                    size='sm' name="username" value={formData.username} onChange={onChangeHandler} 
                    type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required className="shadow-none" size='sm' name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required className="shadow-none" size='sm' name="password1" onChange={onChangeHandler} type="password" value={formData.password} placeholder="Password" />
                </Form.Group> 
                {registering ? <ButtonLoader variant="primary" /> : <Button className="shadow-none" variant="primary" size='sm' type="submit">Sign up</Button>}
            </Form>
            <small>have an account ? <Link to='/signin'>login</Link></small>

        </FormContainer>
    )
}
const mapStateToProps = state=> ({
    auth: state.auth
})
const mapDispatchToProps = { signup }
export default connect(mapStateToProps, mapDispatchToProps)(Signup)