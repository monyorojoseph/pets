import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

const ButtonLoader = ({variant}) => {
  return (
      <Button variant={variant}><Spinner animation='border' size="sm" role='status' /></Button>    
  )
}

export default ButtonLoader