import React, {useState, useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { AiOutlineClose} from 'react-icons/ai'
import { connect } from 'react-redux'
import { RESET_ERRORS, RESET_MESSAGES } from '../actions/types'

const Toasts = ({message, dispatch}) => {
  const [show, setShow] = useState(true)
  const [toasts, setToasts] = useState([])
  const { messages, errors } = message


  useEffect(()=> {
    if (messages){
      setToasts([...toasts, {msg:messages.detail, bg:"success"}])
      dispatch({ type: RESET_MESSAGES })
    }
    if (errors.username) {
      setToasts([...toasts, {msg:errors.username, bg:"danger"}])
    }
    if (errors.email) {
      setToasts([...toasts, {msg:errors.email, bg:"danger"}])
    }    
    if (errors.password1) {
      setToasts([...toasts, {msg:errors.password1, bg:"danger"}])
    }
    if (errors.non_field_errors) {
      setToasts([...toasts, {msg:errors.non_field_errors, bg:"danger"}])
    }
    if (errors.detail) {
      setToasts([...toasts, {msg:errors.detail, bg:"danger"}])
    }
    if (errors.new_password2) {
      setToasts([...toasts, {msg:errors.new_password2, bg:"danger"}])
    }
    if (errors.error) {
      setToasts([...toasts, {msg:errors.error, bg:"danger"}])
    }
  }, [message])

  return (    
    <ToastContainer className="p-3" position='top-end' >   
      { toasts.map((toast, index)=> (
          <Toast key={index} bg={toast.bg} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <div className="fw-bold text-light d-flex flex-row align-items-center justify-content-between">
                <Toast.Body>{toast.msg}</Toast.Body>
                <AiOutlineClose className='mx-2 fs-5 fw-bold ' onClick={()=> setShow(false)}/>
            </div>
          </Toast>
          )
        )
      } 
    </ToastContainer>
  )
}
const mapStateToProps = state=> ({
  message: state.message
})

export default connect(mapStateToProps, null)(Toasts)