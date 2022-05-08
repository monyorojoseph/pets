import React from 'react'
import { Link } from 'react-router-dom'


const NoPets = () => {
  return (
      <div className="text-center mt-3 fs-5 text-muted fw-bold"><p>No Pets available from your region,<Link className='ms-2' to="/profile/add-pet">add pet</Link> </p></div>
  )
}

export default NoPets