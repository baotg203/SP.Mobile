export const validateProfile="Validate_Profile"

export const validatedProfile = false

export default function ProfileReducer(state=validatedProfile, action){
    switch(action.type){
        case validateProfile:
            return{
                validatedProfile: action.payload
            }
        default:
            return state
    }
}