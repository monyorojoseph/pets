import { ADD_BOOKMARK, ADD_BOOKMARK_FAIL, ADD_BOOKMARK_SUCCESS, DELETE_BOOKMARK, DELETE_BOOKMARK_FAIL, DELETE_BOOKMARK_SUCCESS, GET_BOOKMARK, GET_BOOKMARKS, GET_BOOKMARKS_FAIL, GET_BOOKMARKS_SUCCESS, GET_BOOKMARK_FAIL, GET_BOOKMARK_SUCCESS } from "../actions/types"

const initialState = {
    loading: false,
    bookmarks: [],
    bookmarkData: {"pet":{"breed":{}}},
    images: [],
    adding: false,
    deleting: false,
    deleted: false
}

export default function(state=initialState, action) {
    switch(action.type) {
        case ADD_BOOKMARK:
            return {
                ...state,
                adding: true,
            }
        case ADD_BOOKMARK_SUCCESS:
            return {
                ...state,
                adding: false,
            }
        case ADD_BOOKMARK_FAIL:
            return {
                ...state,
                adding: false
            }
        case GET_BOOKMARKS:
        case GET_BOOKMARK:
            return {
                ...state,
                loading: true,
                deleted: false
            }
        case GET_BOOKMARKS_SUCCESS:
            return {
                ...state,
                loading: false, 
                bookmarks: action.payload
            }
        case GET_BOOKMARK_SUCCESS:
            return {
                ...state,
                loading: false,
                bookmarkData: action.payload.bookmark,
                images: action.payload.images
            }
        case GET_BOOKMARK_FAIL:
        case GET_BOOKMARKS_FAIL:
            return {
                ...state,
                loading: false
            }
        case DELETE_BOOKMARK:
            return {
                ...state,
                deleting: true
            }
        case DELETE_BOOKMARK_SUCCESS:
            return {
                ...state,
                deleting: false,
                deleted: true,
                bookmarkData: {"pet":{"breed":{}}}
            }
        case DELETE_BOOKMARK_FAIL:
            return {
                ...state,
                deleting: false
            }
        default:
            return state
    }
}