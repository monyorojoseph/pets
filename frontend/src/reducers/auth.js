import { CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, DELETE_ACCOUNT, 
    DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT_SUCCESS, 
    LOGGING_IN, LOGGING_IN_FAIL, LOGGING_IN_SUCCESS, LOGGING_OUT, 
    LOGGING_OUT_FAIL, LOGGING_OUT_SUCCESS, REGISTERING, REGISTERING_FAIL, 
    REGISTERING_SUCCESS, 
    SEND_EMAIL,
    SEND_EMAIL_FAIL,
    SEND_EMAIL_SUCCESS} from "../actions/types"

const initialState = {
    credentials: localStorage.getItem("credentials") ? JSON.parse(localStorage.getItem("credentials")) : {"user": {}},
    loading: false,
    deleting: false,
    registering: false,
    registered: false,
    changing: false,
    sending: false,
}

export default function(state=initialState, action) {
    switch(action.type){
        case LOGGING_IN:
        case LOGGING_OUT:
            return {
                ...state,
                loading: true,
                registered: false,
            }
        case LOGGING_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                credentials: action.payload
            }
        case LOGGING_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                credentials: {"user": {}}
            }
        case LOGGING_IN_FAIL:
        case LOGGING_OUT_FAIL:            
            return {
                ...state,
                loading: false
            }
        case REGISTERING:
            return {
                ...state,
                registering: true
            }            
        case REGISTERING_SUCCESS:
            return {
                ...state,
                registered: true,
                registering: false
            }
        case REGISTERING_FAIL:
            return {
                ...state,
                registering: false
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                changing: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changing: false,
                credentials: {"user": {}}
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                changing: false
            }
        case DELETE_ACCOUNT:
            return {
                ...state,
                deleting: true
            }
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                deleting: false,
                credentials: {"user": {}}
            }
        case DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                deleting: false
            }
        case SEND_EMAIL:
            return {
                ...state,
                sending: true
            }
        case SEND_EMAIL_SUCCESS:
        case SEND_EMAIL_FAIL:
            return {
                ...state,
                sending: false
            }
        default:
            return state
    }
}