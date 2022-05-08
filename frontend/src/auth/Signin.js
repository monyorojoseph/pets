import React, {useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../containers/FormContainer'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import ButtonLoader from '../components/ButtonLoader'
import { signin  } from '../actions/auth'
import { connect } from 'react-redux'

const Signin = ({signin, auth}) => {
    const { loading, credentials: {access_token}} = auth
    let location = useLocation()
    let navigate = useNavigate()
    let from = location.state?.from?.pathname || "/"

    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    })
    const onChangeHandler = (e)=> {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e)=> {
        e.preventDefault();
        signin(formData)
    }
    
    useEffect(()=>{
        if (access_token ){
            navigate(from, {replace: true})
        } 
    }, [access_token])
    
  return (
    <FormContainer>
        <Form onSubmit={onSubmitHandler} className='mb-3'>
            <Form.Group className="mb-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control required className="shadow-none" size='sm' name="email" 
                value={formData.email} onChange={onChangeHandler} type="email" placeholder="Enter email"
                // onBlur={onBlurHandler} 
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control required className="shadow-none" size='sm' name="password" value={formData.password} onChange={onChangeHandler} type="password" placeholder="Password" />
            </Form.Group>
            {loading ? 
                <ButtonLoader variant="primary" /> : 
                <Button className="shadow-none" variant="primary" size='sm' type="submit">
                    Sign in
                </Button>
            }
        </Form>
        <small>don't have an account ? <Link to='/signup'>register</Link></small> <br />
        {/* <small>forgot password ? <Link to='/reset-password'>reset</Link></small> */}

    </FormContainer>
  )
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)