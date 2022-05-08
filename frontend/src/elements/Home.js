import { Container, Nav} from 'react-bootstrap'
import { Outlet, NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container className='my-2'>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to="/" eventKey='link-0'>All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to="sale" eventKey="link-1">Sale</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} className='text-success fw-bold' to="adoption" eventKey="link-2">Adoption</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='my-3'>
        <Outlet />
      </div>
    </Container>
  )
}

export default Home