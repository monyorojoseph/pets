import { GET_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from "../actions/types"

const initialState = {
    loading: false,
    profileData: {"user": {}},
    updating: false,
    updated: false,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                loading: true,
                updated: false,
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            }
        case GET_PROFILE_FAIL:
            return {
                ...state,
                loading: false
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                updating: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updating: false,
                updated: true,
                profileData: action.payload
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updating: false
            }
        default:
            return state
    }
}