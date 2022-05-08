import axios from 'axios'
import { tokenJsonConfig } from '../utils'
import { GET_BREEDS, GET_BREEDS_SUCCESS, GET_BREEDS_FAIL, ADD_BREED, ADD_BREED_SUCCESS, ADD_BREED_FAIL, SHOW_ERROR, SHOW_MESSAGE } from './types'

// add breed
export const add_breed = (formData) => async(dispatch, getState)=> {
    try{
        dispatch({type: ADD_BREED})
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const { data } = await axios.post("/pet/create-breed/", formData, config)
        dispatch({type: ADD_BREED_SUCCESS})
        dispatch({type: SHOW_MESSAGE, payload: data})
    } catch (error) {
        dispatch({type: ADD_BREED_FAIL})
        dispatch({ type: SHOW_ERROR, payload: error.response.data ? error.response.data : {"error": error.message}})
    }
}

// get breeds
export const all_breeds = ()=> async(dispatch)=> {
    try{
        dispatch({ type:GET_BREEDS })
        const {data} = await axios.get("/pet/list-breeds/")
        dispatch({
            type: GET_BREEDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:GET_BREEDS_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}