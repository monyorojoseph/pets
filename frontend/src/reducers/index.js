import { combineReducers } from 'redux'
import auth from './auth'
import bookmark from './bookmark'
import breed from './breed'
import pet from './pet'
import profile from './profile'
import message from './message'

export default combineReducers({auth, bookmark, breed, pet, profile, message})