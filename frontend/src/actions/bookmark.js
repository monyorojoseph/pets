import axios from 'axios'
import { tokenJsonConfig } from '../utils';
import { ADD_BOOKMARK, ADD_BOOKMARK_FAIL, ADD_BOOKMARK_SUCCESS, 
    DELETE_BOOKMARK, DELETE_BOOKMARK_FAIL, DELETE_BOOKMARK_SUCCESS, 
    GET_BOOKMARK, GET_BOOKMARKS, GET_BOOKMARKS_FAIL, GET_BOOKMARKS_SUCCESS, 
    GET_BOOKMARK_FAIL, GET_BOOKMARK_SUCCESS, SHOW_ERROR, SHOW_MESSAGE } from './types'

// add bookmark
export const add_bookmark = (formData)=> async(dispatch, getState)=> {
    try{
        dispatch({ type: ADD_BOOKMARK })
        const token = getState().auth.credentials.access_token;
        const config = tokenJsonConfig(token)
        const { data } = await axios.post("/pet/create-bookmark/", formData, config)
        dispatch({ type: ADD_BOOKMARK_SUCCESS })
        dispatch({ type: SHOW_MESSAGE, payload: data})
    } catch(error) {
        dispatch({ type:ADD_BOOKMARK_FAIL})
        dispatch({ type: SHOW_ERROR, payload: error.response.data ? error.response.data : error.message})
    }
}

// get bookmarks 
export const all_bookmarks = ()=> async(dispatch, getState)=> {
    try{
        dispatch({ type: GET_BOOKMARKS })
        const token = getState().auth.credentials.access_token;
        const config = tokenJsonConfig(token)
        const { data } = await axios.get("/pet/list-bookmarks/", config)
        dispatch({ 
            type: GET_BOOKMARKS_SUCCESS,
            payload: data
         })
    } catch(error) {
        dispatch({ type:GET_BOOKMARKS_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}
// get bookmark
export const get_bookmark = (id)=> async(dispatch, getState)=> {
    try{
        dispatch({ type: GET_BOOKMARK })
        const token = getState().auth.credentials.access_token;
        const config = tokenJsonConfig(token)
        const { data } = await axios.get(`/pet/detail-bookmark/${id}`, config)
        dispatch({ 
            type: GET_BOOKMARK_SUCCESS,
            payload: data
         })
    } catch(error) {
        dispatch({ type:GET_BOOKMARK_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}

// remove bookmark
export const remove_bookmark = (id)=> async(dispatch, getState)=> {
    try{
        dispatch({ type: DELETE_BOOKMARK })
        const token = getState().auth.credentials.access_token;
        const config = tokenJsonConfig(token)
        const { data } = await axios.delete(`/pet/remove-bookmark/${id}`, config)
        dispatch({type: DELETE_BOOKMARK_SUCCESS})
        dispatch({ type: SHOW_MESSAGE, payload: data})
    } catch(error) {
        dispatch({ type:DELETE_BOOKMARK_FAIL})
        dispatch({ type: SHOW_ERROR, payload: {"error": error.message}})
    }
}
