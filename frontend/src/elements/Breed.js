import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const Breed = () => {
  return (
    <Container className='my-2'>
        <div className='mb-3'>
            <h5>Pet Breed</h5>
            <p>Add few breeds that you know that aren't there</p>
            <Link to="/breed">Available</Link><br />
            <Link to="add">Add breed</Link>
        </div>
        <div>
            <Outlet />
        </div>
    </Container>
  )
}

export default Breed