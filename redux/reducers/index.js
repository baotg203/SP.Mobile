import { combineReducers } from "redux";
import User from './userReducer'
import  validated  from "./validateReducer";
import validatedProfile from './profileReducer'

const reducers = combineReducers({
    userInfo: User,
    userValidated: validated,
    profileValidated: validatedProfile,
})

export default (state, action)=>reducers(state, action)