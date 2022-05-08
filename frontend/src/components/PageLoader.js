import React from 'react'
import { Spinner } from 'react-bootstrap'

const PageLoader = () => {
  return (
        <div className='d-flex justify-content-center align-items-center' style={{"height": "200px"}}>
            <Spinner animation='border' variant='success' style={{"height": "3rem", "width": "3rem"}}/>
        </div>
    
  )
}

export default PageLoader