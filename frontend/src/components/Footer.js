import React from 'react'
import { Container } from 'react-bootstrap'
import { FaRegCopyright } from 'react-icons/fa'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div id="footer" className='bg-dark py-1 text-light w-100'>
      <Container>
        <p className='m-0 fs-6 fw-lighter d-flex flex-row justify-content-center align-items-center'><FaRegCopyright className='me-2' /> {year}<span className='ms-2'> Get a Pet</span></p>
      </Container>
    </div>
  )
}

export default Footer