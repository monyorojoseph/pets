import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = (props) => {
  return (
    <Container className='mt-2'>
        <Row className='justify-content-center'>
            <Col xs={11} sm={10} md={6}>
                {props.children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer