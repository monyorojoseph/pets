import { ADD_BREED, ADD_BREED_SUCCESS, ADD_BREED_FAIL, GET_BREEDS, GET_BREEDS_FAIL, GET_BREEDS_SUCCESS } from "../actions/types"

const initialState = {
    loading: false,
    breeds: [],
    adding: false,
    added: false
}

export default function(state=initialState, action){
    switch(action.type) {
        case GET_BREEDS:
            return {
                ...state,
                loading: true,
                added: false,
            }
        case GET_BREEDS_SUCCESS:
            return {
                ...state,
                loading: false,
                breeds: action.payload
            }
        case GET_BREEDS_FAIL:
            return {
                ...state,
                loading: false
            }
        case ADD_BREED:
            return {
                ...state,
                adding: true
            }
        case ADD_BREED_SUCCESS:
            return {
                ...state,
                adding: false,
                added: true
            }
        case ADD_BREED_FAIL:
            return {
                ...state,
                adding: false
            }
        default:
            return state
    }
}