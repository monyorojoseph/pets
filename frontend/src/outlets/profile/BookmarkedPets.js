import React, { useEffect } from 'react'
import { Container, Row,  Col, Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import PageLoader from '../../components/PageLoader'
import { connect } from 'react-redux'
import { all_bookmarks } from '../../actions/bookmark'

const BookmarkedPets = ({bookmark, all_bookmarks }) => {
  const { bookmarks, loading } = bookmark
  useEffect(() => {
    all_bookmarks()
  }, [])
  
  return loading ? (<PageLoader />) : (
    <Container>
      <Row className='my-3 px-1' xs={1} sm={2} md={4} lg={5}>
        {bookmarks.length === 0  ? <p className='text-center w-100 fs-5 text-muted fw-bold'>No bookmarks for you, add some</p> :
        bookmarks.map((bookmark)=> (        
        <Col key={bookmark.id}>
            <Card className='p-0'>
                <img alt={bookmark.pet_name} variant="top" src={bookmark.pet.cover_image} className="m-0" />
                <Card.Body>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className='fw-bold'>For {bookmark.pet.sale_adoption}</span>
                        <span>{bookmark.pet.price}</span>
                    </div>

                    <div className="text-center mt-2">
                        <Button as={Link} className='shadow-none' size='sm' variant='primary' to={`/bookmark/${bookmark.id}`}>see more details</Button>
                    </div>           
                </Card.Body>
            </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

const mapStateToProps = state=> ({
  bookmark: state.bookmark
})

const mapDispatchToProps = {all_bookmarks}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedPets)