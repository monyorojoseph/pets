import { RESET_ERRORS, RESET_MESSAGES, SHOW_ERROR, SHOW_MESSAGE } from "../actions/types"

const initialState = {
    errors: '',
    messages: ''
}

export default function(state=initialState, action) {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {
                ...state,
                messages: action.payload
            }
        case SHOW_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case RESET_MESSAGES:
            return {
                ...state,
                messages: ''
            }
        case RESET_ERRORS:
            return {
                ...state,
                errors: ''
            }
        default:
            return state
    }
}