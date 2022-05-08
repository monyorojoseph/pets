import { GET_PET, GET_PETS, GET_PETS_FAIL, GET_PETS_SUCCESS, 
    GET_PET_SUCCESS, GET_PET_FAIL, ADD_PET, ADD_PET_SUCCESS, 
    ADD_PET_FAIL, DELETE_PET, DELETE_PET_SUCCESS, DELETE_PET_FAIL, 
    UPDATE_PET, UPDATE_PET_SUCCESS, UPDATE_PET_FAIL, ADD_PET_IAMGE, ADD_PET_IAMGE_FAIL, ADD_PET_IAMGE_SUCCESS, DELETE_PET_IAMGE, DELETE_PET_IAMGE_SUCCESS, DELETE_PET_IAMGE_FAIL } from "../actions/types"

const initialState = {
    loading: false,
    petData: {"breed": {}},
    images: [],
    pets: [],
    adding: false,
    added: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    deletingImage: false,
    deletedImage: false
}

export default function(state=initialState, action) {
    switch(action.type){
        case GET_PETS:
        case GET_PET:
            return {
                ...state,
                loading: true,
                added: false,
                deleted: false,
                updated: false,
                deletedImage: false
            }
        case GET_PETS_SUCCESS:
            return {
                ...state,
                loading: false,
                pets: action.payload
            }
        case GET_PET_SUCCESS:
            return {
                ...state,
                loading: false,
                petData: action.payload.pet,
                images: action.payload.images
            }
        case GET_PETS_FAIL:
        case GET_PET_FAIL:
            return {
                ...state,
                loading: false
            }
        case ADD_PET:
        case ADD_PET_IAMGE:
        
            return {
                ...state,
                adding: true
            }
        case ADD_PET_SUCCESS:
        case ADD_PET_IAMGE_SUCCESS:
            return {
                ...state,
                adding: false,
                added: true
            }
        case ADD_PET_FAIL:
        case ADD_PET_IAMGE_FAIL:
            return {
                ...state,
                adding: false
            }
        case DELETE_PET:
            return {
                ...state,
                deleting: true
            }
        case DELETE_PET_SUCCESS:
            return {
                ...state,
                deleting: false,
                deleted: true,
                petData: {"breed": {}}
            }
        case DELETE_PET_FAIL:
            return {
                ...state,
                deleting: false
            }
        case UPDATE_PET:
            return {
                ...state,
                updating: true
            }
        case UPDATE_PET_SUCCESS:
            return {
                ...state,
                updating: false,
                updated: true,
                petData: action.payload
            }
        case UPDATE_PET_FAIL:
            return {
                ...state,
                updating: false
            }
        case DELETE_PET_IAMGE:
            return {
                ...state,
                deletingImage: true
            }
        case DELETE_PET_IAMGE_SUCCESS:
            return {
                ...state,
                deletingImage: false,
                deletedImage: true,
            }
        case DELETE_PET_IAMGE_FAIL:
            return {
                ...state,
                deletingImage: false
            }
        default:
            return state
    }
}