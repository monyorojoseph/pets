import React from 'react';
import { Container, Alert } from 'react-bootstrap'
import { AiOutlineClose  } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CustomeAlert = ({setShow}) => {
  return (
    <Container className='mt-2'>      
      <Alert variant="warning" className='py-2 d-flex flex-row justify-content-between align-items-center'>
            <div>Add few pet breeds that you migth know <Link className='text-reset' to="/breed">add pet breed</Link></div>            
            <AiOutlineClose className='fw-bold fs-4' onClick={(e)=> setShow(false)} />
      </Alert>
    </Container>
  )
}

export default CustomeAlert