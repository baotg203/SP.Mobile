export const validateUser="Validate_User"

export const validated = false

export default function ValidateReducer(state=validated, action){
    switch(action.type){
        case validateUser:
            return{
                validated: action.payload
            }
        default:
            return state
    }
}