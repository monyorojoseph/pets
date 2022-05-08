import React from 'react'
import { Container, Nav, Card, Button } from 'react-bootstrap'
import { NavLink, Outlet, Link } from 'react-router-dom'
import ButtonLoader from '../components/ButtonLoader'
import { remove_account } from '../actions/auth'
import { connect } from 'react-redux'

const Profile = ({ remove_account, auth }) => {
  const { deleting } = auth
  const onClickRemove = ()=> {
    remove_account()
  }
  return (
    <Container className='my-2'>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link as={NavLink}  className='text-success fw-bold' to="/profile" eventKey='link-0'>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to='add-pet' eventKey="link-1">Add Pet</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to="user-pets" eventKey="link-2">Your pets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to="bookmarked-pets" eventKey="link-3">Bookmarks</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="my-3">
        <Outlet />
      </div>

      <Card className='mt-3'>
        <Card.Body>
          <div className='my-2'>
            <Card.Title as='h6'>Change password</Card.Title>
            <Card.Text>
              Change your password to a strong one.
            </Card.Text>
            <Button as={Link} to="/change-password" size="sm" variant="secondary" className="shadow-none">Change</Button>
          </div>

          <div className='my-2'>
            <Card.Title as='h6'>Account Deletion</Card.Title>
            <Card.Text>
              Deleting your account erases all your data, your pets and bookmarks.
            </Card.Text>
            {deleting ? <ButtonLoader variant="danger" /> : <Button onClick={onClickRemove} size="sm" variant="danger" className="shadow-none">Delete</Button>}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = { remove_account }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)