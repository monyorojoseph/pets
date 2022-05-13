import React from 'react'
import { Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions/auth';
import ButtonLoader from './ButtonLoader';



const Verify = ({auth, signout}) => {
    const { loading, credentials: {access_token}} = auth
    const logoutHandler = ()=> {
        signout()
    }
    
    return access_token ?    
            (<Nav className="d-flex flex-row">
                {loading ? <ButtonLoader variant="danger" /> :<Button size='sm' onClick={logoutHandler} variant='danger' className="rounded-0 shadow-none mx-1">Sign out</Button>}
                <Button as={NavLink} size='sm' variant='secondary' className="rounded-0 shadow-none mx-1"  to="profile">Profile</Button>
            </Nav>) 
            :          
            (<Nav className="d-flex flex-row">
                <Button as={NavLink} size='sm' variant='success' className="rounded-0 shadow-none mx-1" to="signin">Sign In</Button>
                <Button as={NavLink} size='sm' variant='secondary' className="rounded-0 shadow-none mx-1"  to="signup">Sign Up</Button>
            </Nav>)        
}

const mapStateToProps = state => ({
    auth: state.auth
  })
  
const mapDispatchToProps = {signout}

export default connect(mapStateToProps, mapDispatchToProps)(Verify)