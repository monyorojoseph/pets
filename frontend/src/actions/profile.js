import axios from 'axios'
import { GET_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, SHOW_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from './types'
import { tokenJsonConfig } from '../utils'

// get profile data
export const get_profile = ()=> async(dispatch, getState)=> {
    try{
        dispatch({type: GET_PROFILE })
        const token = getState().auth.credentials.access_token
        const id = getState().auth.credentials.user.pk
        const config = tokenJsonConfig(token)
        const { data } = await axios.get(`user/profile/${id}/`, config)
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({type:GET_PROFILE_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error" :error.message}})
    }
}

// update profile
export const update_profile = (formData)=> async(dispatch, getState)=> {
    try{
        dispatch({type: UPDATE_PROFILE })
        const token = getState().auth.credentials.access_token
        const id = getState().auth.credentials.user.pk
        const config = tokenJsonConfig(token)
        const { data } = await axios.put(`user/profile/${id}/`, formData, config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({type:UPDATE_PROFILE_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error" :error.message}})
    }
}