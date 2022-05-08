import React from 'react'
import { BsBookmark } from 'react-icons/bs';
import { Button } from 'react-bootstrap'


const BookmarkButton = ({clickHandler}) => {
  return (
    <Button onClick={clickHandler} size="sm" variant='success' className='d-flex flex-row align-items-center shadow-none' >
        <span className='mx-1'>Bookmark</span>
        <BsBookmark className='mx-1' />
    </Button>
  )
}

export default BookmarkButton