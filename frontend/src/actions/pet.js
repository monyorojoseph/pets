import axios from 'axios'
import { ADD_PET, ADD_PET_FAIL, ADD_PET_IAMGE, ADD_PET_IAMGE_FAIL, 
    ADD_PET_IAMGE_SUCCESS, ADD_PET_SUCCESS, DELETE_PET, DELETE_PET_FAIL, 
    DELETE_PET_IAMGE, DELETE_PET_IAMGE_FAIL, DELETE_PET_IAMGE_SUCCESS, 
    DELETE_PET_SUCCESS, GET_PET, GET_PETS, GET_PETS_FAIL, GET_PETS_SUCCESS, 
    GET_PET_FAIL, GET_PET_SUCCESS, SHOW_ERROR, SHOW_MESSAGE, UPDATE_PET, UPDATE_PET_FAIL, UPDATE_PET_SUCCESS } from './types'
import { basicJsonConfig, tokenJsonConfig, tokenFileConfig } from '../utils'

// get all, sale or adopt pets
export const all_pets = (link)=> async(dispatch)=> {
    try{
        dispatch({type:GET_PETS})
        const config = basicJsonConfig
        const {data} = await axios.get(link, config)
        dispatch({
            type:GET_PETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:GET_PETS_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}


// get user pets
export const user_pets = ()=> async(dispatch, getState)=> {
    try{
        dispatch({type:GET_PETS})
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const {data} = await axios.get("/pet/user-pets/", config)
        dispatch({
            type:GET_PETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:GET_PETS_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}

// add pet
export const add_pet = (formData)=> async(dispatch, getState)=> {
    try{
        dispatch({type:ADD_PET})
        const token = getState().auth.credentials.access_token
        const config = tokenFileConfig(token)
        const {data} = await axios.post('/pet/create-pet/', formData, config)
        dispatch({ type:ADD_PET_SUCCESS })
        dispatch({ type: SHOW_MESSAGE, payload: data})
    } catch (error) {
        dispatch({type:ADD_PET_FAIL})
        dispatch ({ type: SHOW_ERROR, payload: error.response.data.detail ? error.response.data.detail : {"error": error.message}})
    }
}

// get pet details
export const pet_details = (pet_name)=> async(dispatch)=> {
    try{
        dispatch({type: GET_PET})
        const config = basicJsonConfig        
        const { data } = await axios.get(`/pet/detail-pet/${pet_name}/`, config)
        dispatch({
            type: GET_PET_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({type:GET_PET_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}

// update pet details
export const update_pet = (formData, pet_name)=> async(dispatch, getState)=> {
    try{
        dispatch({type: UPDATE_PET})
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const {data} = await axios.put(`/pet/update-pet/${pet_name}/`, formData, config)
        dispatch({ type: UPDATE_PET_SUCCESS, payload: data })
    } catch (error) {
        dispatch({type: UPDATE_PET_FAIL})
        dispatch({ type: SHOW_ERROR, payload: error.response.data.detail ? error.response.data.detail : {"error": error.message}})
    }
}

// delete pet
export const remove_pet = (pet_name)=> async(dispatch, getState)=> {
    try{
        dispatch({type: DELETE_PET})
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const {data} = await axios.delete(`/pet/remove-pet/${pet_name}/`, config)
        dispatch({ type: DELETE_PET_SUCCESS})
    } catch (error) {
        dispatch({type: DELETE_PET_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}

// add new image (s)
export const add_pet_image = (formData)=> async(dispatch, getState)=> {
    try{
        dispatch({type: ADD_PET_IAMGE})
        const token = getState().auth.credentials.access_token
        const config = tokenFileConfig(token)
        const {data} = await axios.post(`/pet/add-image/`, formData, config)
        dispatch({ type: ADD_PET_IAMGE_SUCCESS })
        dispatch({ type: SHOW_MESSAGE, payload: data})
    } catch (error) {
        dispatch({type: ADD_PET_IAMGE_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}

// delete image
export const remove_pet_image = (id)=> async(dispatch, getState)=> {
    try{
        dispatch({type: DELETE_PET_IAMGE})
        const token = getState().auth.credentials.access_token
        const config = tokenJsonConfig(token)
        const {data} = await axios.delete(`/pet/remove-image/${id}/`, config)
        dispatch({ type: DELETE_PET_IAMGE_SUCCESS })
    } catch (error) {
        dispatch({type: DELETE_PET_IAMGE_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}