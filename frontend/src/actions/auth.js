import axios from 'axios'
import { CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, 
    DELETE_ACCOUNT, DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT_SUCCESS, LOGGING_IN, 
    LOGGING_IN_FAIL, LOGGING_IN_SUCCESS, LOGGING_OUT, LOGGING_OUT_FAIL, LOGGING_OUT_SUCCESS, 
    REGISTERING, REGISTERING_FAIL, REGISTERING_SUCCESS, SEND_EMAIL, SEND_EMAIL_FAIL, SEND_EMAIL_SUCCESS, SHOW_ERROR, SHOW_MESSAGE} from './types'
import { basicJsonConfig, tokenJsonConfig } from '../utils'

// signup
export const signup = (signupData)=> async(dispatch)=> {
    try{
        dispatch({type: REGISTERING})        
        const config = basicJsonConfig
        await axios.post("/dj-rest-auth/registration/", signupData, config)
        dispatch({ type: REGISTERING_SUCCESS})
    } catch(error){
        dispatch({type: REGISTERING_FAIL })
        dispatch({ type: SHOW_ERROR, payload: error.response.data ? error.response.data : {"error": error.message}})
    }
}
// sign in
export const signin = (signinData)=> async(dispatch)=> {
    try{
        dispatch({type: LOGGING_IN})        
        const config = basicJsonConfig
        const { data } = await axios.post("/dj-rest-auth/login/", signinData, config)
        localStorage.setItem("credentials", JSON.stringify(data))
        dispatch({
            type: LOGGING_IN_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({type: LOGGING_IN_FAIL })
        dispatch({ type: SHOW_ERROR, payload: error.response.data ? error.response.data : {"error": error.message}})
    }
}
// sign out
export const signout = ()=> async(dispatch, getState)=> {
    try{
        dispatch({type: LOGGING_OUT })
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        await axios.post("/dj-rest-auth/logout/", {}, config)
        dispatch({type: LOGGING_OUT_SUCCESS })
        localStorage.removeItem("credentials")
    } catch(error) {
        dispatch({type: LOGGING_OUT_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})

    }        
}

// change password
export const change_password = (formData)=> async(dispatch, getState)=> {
    try{
        dispatch({type: CHANGE_PASSWORD })
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const {data} = await axios.post("/dj-rest-auth/password/change/", formData, config)
        dispatch({type: CHANGE_PASSWORD_SUCCESS })
        dispatch({ type: SHOW_MESSAGE, payload: data})
        localStorage.removeItem("credentials")
    } catch(error) {
        dispatch({type: CHANGE_PASSWORD_FAIL})
        dispatch({ type: SHOW_ERROR, payload: error.response.data ? error.response.data : {"error": error.message}})
        console.log(error)

    }        
}

// reset passwrod
export const send_email = ({formData})=> async(dispatch)=> {
    try{
        dispatch({type: SEND_EMAIL })
        const config = basicJsonConfig
        const {data} = await axios.post('dj-rest-auth/password/reset/', formData, config)
        dispatch({type: SEND_EMAIL_SUCCESS })
        console.log(data)
        dispatch({ type: SHOW_MESSAGE, payload: data })
    } catch(error) {
        dispatch({type: SEND_EMAIL_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }        
}
// remove account
export const remove_account = ()=> async(dispatch, getState)=> {
    try{
        dispatch({type: DELETE_ACCOUNT })
        const token = getState().auth.credentials.access_token
        const id = getState().auth.credentials.user.pk
        const config = tokenJsonConfig(token)
        const {data} = await axios.delete(`/user/remove-account/${id}`, config)
        dispatch({type: DELETE_ACCOUNT_SUCCESS })
        dispatch({ type: SHOW_MESSAGE, payload: data})
        localStorage.removeItem("credentials")
    } catch(error) {
        dispatch({type: DELETE_ACCOUNT_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }        
}