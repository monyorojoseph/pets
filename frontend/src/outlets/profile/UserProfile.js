import React, {useEffect, useState} from 'react'
import { Card, Button, Collapse, Form, Row, Col } from 'react-bootstrap'
import ButtonLoader from '../../components/ButtonLoader'
import PageLoader from '../../components/PageLoader'
import { connect } from 'react-redux'
import { get_profile, update_profile } from '../../actions/profile'
import { sex_choices } from '../../utils'


const UserProfile = ({get_profile, profile, update_profile}) => {
  const { loading, profileData, updated, updating} = profile
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    'username': '',
    'email': '',
    'gender': '',
    'age': 0,
    'contact': ''
  })

  const handleOpen = ()=> {
    setOpen(!open)   
    setFormData({      
      'username': profileData.user.username,
      'email': profileData.user.email,
      'gender': profileData.gender,
      'age': profileData.age,
      'contact': profileData.contact
    })
  }

  const onChangeHandler = (e)=> {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const onSubmitHandler = (e)=> {
    e.preventDefault();
    update_profile(formData);
    
  }
  useEffect(()=> {
    get_profile()
    if (updated) {
      setOpen(false)
    }
  }, [updated])
  
  return (
    <Card className='my-3'>
    <Card.Body>
        {loading ? (<PageLoader />) : (<div className="mb-3 fw-bold text-muted fs-5">
            <p>Username <span className='text-dark fw-normal ms-4'>{profileData && profileData.user.username}</span></p>
            <p>Email<span className='text-dark fw-normal ms-4'>{profileData && profileData.user.email}</span></p>
            <p>Gender<span className='text-dark fw-normal ms-4'>{profileData && profileData.gender}</span></p>
            <p>Age<span className='text-dark fw-normal ms-4'>{profileData && profileData.age}</span></p>
            <p>Contact<span className='text-dark fw-normal ms-4'>{profileData && profileData.contact}</span></p>
            <p>City<span className='text-dark fw-normal ms-4'>{profileData && profileData.city}</span></p>
            <p>Country<span className='text-dark fw-normal ms-4'>{profileData && profileData.country}</span></p>
        </div>)}
        <Button onClick={handleOpen} aria-controls="update-profile"
        aria-expanded={open} size="sm" variant="primary"  className='shadow-none'>Edit</Button>

        <Collapse in={open} className="mt-3">
        <div id="update-profile">
          <h6 className="text-center my-4">Update profile details</h6>
            <Form onSubmit={onSubmitHandler}>
              <Row className='justify-content-start g-2 mb-3'>
                <Col md={2}><Form.Label className="fs-5 text-muted fw-bold">Username:</Form.Label></Col>
                <Col md={8}><Form.Control className='shadow-none' onChange={onChangeHandler} value={formData.username} type='text' size='sm' name="username" /></Col>
              </Row>   
              
              <Row className='justify-content-start g-2 mb-3'>
                <Col md={2}><Form.Label className="fs-5 text-muted fw-bold">Email address:</Form.Label></Col>
                <Col md={8}><Form.Control className='shadow-none' onChange={onChangeHandler} value={formData.email} type='text' size='sm' name='email' /></Col>
              </Row> 

              <Row className='justify-content-start g-2 mb-3'>
                <Col md={2}><Form.Label className="fs-5 text-muted fw-bold">Gender:</Form.Label></Col>
                <Col md={8}>                
                  <Form.Select className='shadow-none' onChange={onChangeHandler} defaultValue={formData.gender} name="gender" size='sm'>
                    {!formData.gender && <option>-------------</option>}
                    {sex_choices.map((s, index)=> (<option value={s} key={index} >{s}</option>))}
                  </Form.Select>
                </Col>
              </Row> 

              <Row className='justify-content-start g-2 mb-3'>
                <Col md={2}><Form.Label className="fs-5 text-muted fw-bold">Age:</Form.Label></Col>
                <Col md={8}><Form.Control className='shadow-none' onChange={onChangeHandler} value={formData.age} type='number' size='sm' name='age' plageholder="what's your age?"/></Col>
              </Row>  

              <Row className='justify-content-start g-2 mb-3'>
                <Col md={2}><Form.Label className="fs-5 text-muted fw-bold">Contact:</Form.Label></Col>
                <Col md={8}><Form.Control className='shadow-none' onChange={onChangeHandler} value={formData.contact} type='text' size='sm' name='contact' placeholder="type your phone" /></Col>
              </Row>
              {updating ? <ButtonLoader variant='primary' /> : <Button type="submit" variant="primary" size="sm">Save</Button>}
            </Form>
        </div>
      </Collapse>
    </Card.Body>
  </Card>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = { get_profile, update_profile }

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)